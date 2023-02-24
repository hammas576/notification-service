# Notification-service

<p align="center">
A distributed system developed with RabbitMQ, Node.js, Express.js and Docker <br><br>
  <a href="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Node.js_logo_2015.svg/1200px-Node.js_logo_2015.svg.png">
    <img alt="Node" src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Node.js_logo_2015.svg/1200px-Node.js_logo_2015.svg.png" height=50 width=186/>
  </a>
  <a href="https://upload.wikimedia.org/wikipedia/commons/7/71/RabbitMQ_logo.svg">
    <img alt="RabbitMQ" src = "https://upload.wikimedia.org/wikipedia/commons/7/71/RabbitMQ_logo.svg" height=50 width=318>
  </a>
  <a href="https://www.docker.com/sites/default/files/d8/2019-07/vertical-logo-monochromatic.png">
    <img alt="Docker" src = "https://www.docker.com/sites/default/files/d8/2019-07/vertical-logo-monochromatic.png" height=50 width=58>
  </a>
</p>
<br>

## System Architecture and Flow
Notification-service mimics distributed systems where the components of the system are loosely coupled. The system consists of microservices architecture. It contains a user management service and a notification service. Both of the services communicate asynchronously through rabbit mq utilizing the amqp protocol. The amqp protocol is around 4 times faster than the traditional request response http protocol. We communicate with the user management service via REST endpoints the user management service than processes our data and forwards it to the respective rabbit mq queues the notification service consumes the data from the queues and passes it to the socket server passing it to the connected client whose id has been passed previously, mimicing a real world scenario where we need to generate notifications and sending emails via a separte notification service. The notification service is loosely coupled and is a standalone service and any number of services can send their notifications and emails via the notification service.

## Getting Started with Docker

If you have Docker installed in your computer, you do not need to have Node.js or RabbitMQ installed. You can run the application with a single command:

```bash
$ docker-compose up
```

Note: notification-service requires a valid SMTP configuration to send emails. Update them in the <i>environment</i> section of <i>notification-service</i> in <i>docker-compose.yml</i>. The application can be tweaked with the environment variables defined in this file.

To scale each component independently, use:

```bash
$ docker-compose up --scale <service-name>=<number-of-containers>
```

## Getting Started without Docker

Without Docker, you need to install RabbitMQ, Node.js, NPM. </br>
To install Node.js and NPM, refer to the documentation provided [here](https://nodejs.org/en/download/package-manager).</br>
To install RabbitMQ, refer to the documentation provided [here](https://www.rabbitmq.com/download.html).

### Step 1 - Start RabbitMQ and MongoDB

To start RabbitMQ:

- Mac:
  ```bash
  $ rabbitmq-server
  ```

### Step 2 - Start all two node applications

To get the Node server running locally:

- `npm install` to install all required dependencies from package.json:
  ```bash
  $ npm install
  ```
- `npm start` to start the local server:
  ```bash
  $ npm run start
  ```
- `npm run dev` to start the local server in development mode:
  `bash
$ npm run dev
`
  Run the `install` and `start` commands for notification.service and user.management.services.

## API

## test notification

---

Returns json containing the status of the request.

- **URL**

  /api/user/test-notification

- **Method:**

  `POST`

- **URL Params**

  None

- **Query Params**

  None

- **Data Params**

  **Required:**

  - `email: [string]`
  - `userId: [string]`
  - `message: [string]`

- **Success Response:**

  - **Code:** 200 SUCCESS<br/>

## Authors

- **Hammas kermani** - [hammas576](https://github.com/hammas576)
