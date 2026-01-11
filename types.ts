// types.ts
import { Context, Handler } from 'aws-lambda';
import { SQSEvent } from 'aws-lambda';

// Interface for the Analytics SQS event
interface AnalyticsEvent {
  event_name: string;
  event_time: number;
  user_id: string;
  product_id: string;
  action: string;
  quantity: number;
}

// Interface for the SQS event handler
interface SQSHandler {
  handleEvent(event: AnalyticsEvent): void;
}

// Interface for the Analytics context
interface AnalyticsContext {
  callbackWaitsForEmptyEventLoop: boolean;
  functionName: string;
  functionVersion: string;
  invokedFunctionArn: string;
  logGroupName: string;
  logStreamName: string;
  awsRequestId: string;
}

// Main type for the AWS Lambda handler
interface AnalyticsHandler {
  event: AnalyticsEvent;
  context: AnalyticsContext;
  sqs: SQSEvent;
}

// Define the main handler type
type MainHandler = Handler<AnalyticsHandler, AnalyticsEvent>;

// Export the main handler type
export { MainHandler };