import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  ScanCommand,
  PutCommand,
  UpdateCommand,
  QueryCommand,
  DeleteCommand,
} from "@aws-sdk/lib-dynamodb";
import { randomUUID } from "crypto";

const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);
const tableName = "activity-table"; // Deine DynamoDB-Tabelle

export const handler = async (event, context) => {
  let body;
  let statusCode = 200;
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  try {
    const requestJSON = event.body ? JSON.parse(event.body) : {};

    switch (event.routeKey) {
      // Erstellen eines neuen Elements
      case "POST /activities/new":
        const newItem = {
          id: randomUUID(), // Automatisch generierte ID
          user_id: requestJSON.user_id, // String (wird übergeben)
          activity: requestJSON.activity, // String (wird übergeben)
          reps: requestJSON.reps, // Integer (wird übergeben)
          total_reps: requestJSON.total_reps, // Integer (wird übergeben)
        };

        await dynamo.send(
          new PutCommand({
            TableName: tableName,
            Item: newItem,
          })
        );
        body = `Created item with id ${newItem.id}`;
        break;

      // Aktualisieren eines bestehenden Elements
      case "PUT /activities/user/{user_id}/activity/{id}":
        const { activityName, progress, totalReps } = JSON.parse(event.body); // Neue Werte

        // 1. Suche die Aktivitäten des Benutzers über den GSI
        const userActivities = await dynamo.send(
          new QueryCommand({
            TableName: tableName,
            IndexName: "user_id-index", // Verwende den globalen sekundären Index
            KeyConditionExpression: "user_id = :user_id",
            ExpressionAttributeValues: {
              ":user_id": event.pathParameters.user_id,
            },
          })
        );

        // 2. Finde das spezifische Element anhand der id
        const activityToUpdate = userActivities.Items.find(
          (item) => item.id === event.pathParameters.id
        );

        if (!activityToUpdate) {
          throw new Error("Activity not found for the given user_id and id");
        }

        // 3. Update der Aktivität in der Haupttabelle
        const updateResult = await dynamo.send(
          new UpdateCommand({
            TableName: tableName,
            Key: {
              id: activityToUpdate.id, // Hier verwenden wir nur die id
            },
            UpdateExpression:
              "set activity = :activityName, reps = :progress, total_reps = :totalReps",
            ExpressionAttributeValues: {
              ":activityName": activityName,
              ":progress": progress,
              ":totalReps": totalReps,
            },
            ReturnValues: "ALL_NEW",
          })
        );

        body = updateResult.Attributes; // Rückgabe der aktualisierten Aktivität
        break;

      // Alle Elemente für eine bestimmte user_id abrufen
      case "GET /activities/user/{user_id}":
        const result = await dynamo.send(
          new QueryCommand({
            TableName: tableName,
            IndexName: "user_id-index", // Nutzt einen sekundären Index für user_id
            KeyConditionExpression: "user_id = :user_id",
            ExpressionAttributeValues: {
              ":user_id": event.pathParameters.user_id, // `user_id` als Filter
            },
          })
        );
        body = result.Items;
        break;

      // Ein bestimmtes Element löschen
      case "DELETE /activities/user/{user_id}/activity/{id}":
        // 1. Suche die Aktivitäten des Benutzers über den GSI
        const activitiesToDelete = await dynamo.send(
          new QueryCommand({
            TableName: tableName,
            IndexName: "user_id-index", // Verwende den globalen sekundären Index
            KeyConditionExpression: "user_id = :user_id",
            ExpressionAttributeValues: {
              ":user_id": event.pathParameters.user_id,
            },
          })
        );

        // 2. Finde das spezifische Element anhand der id
        const activityToDelete = activitiesToDelete.Items.find(
          (item) => item.id === event.pathParameters.id
        );

        if (!activityToDelete) {
          throw new Error("Activity not found for the given user_id and id");
        }

        // 3. Lösche die Aktivität in der Haupttabelle
        await dynamo.send(
          new DeleteCommand({
            TableName: tableName,
            Key: {
              id: activityToDelete.id, // Hier verwenden wir nur die id
            },
          })
        );

        body = `Deleted activity with id ${activityToDelete.id}`;
        break;

      default:
        throw new Error(`Unsupported route: "${event.routeKey}"`);
    }
  } catch (err) {
    statusCode = 400;
    body = err.message;
  } finally {
    body = JSON.stringify(body);
  }

  return {
    statusCode,
    body,
    headers,
  };
};
