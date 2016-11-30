import { UserMessage } from "./models";
import WebSocket = require("ws");

const port: number = process.env.PORT || 3000;

class WebSocketServer {
    private server: WebSocket.Server
    constructor(port: number) {
        this.server = new WebSocket.Server({ port: port });
    }

    private broadcast(data: string) {
        this.server.clients.forEach(client => {
            client.send(data);
        });
    }

    private async connect(): Promise<WebSocket> {
        return new Promise<WebSocket>((resolve) => {
            this.server.on("connection", ws => {
                resolve(ws);
            })
        });
    }

    private async receive(ws: WebSocket): Promise<string> {
        return new Promise<string>((resolve) => {
            ws.on("message", message => {
                resolve(message);
            });
        });
    }

    private async loop(): Promise<void> {
        const ws = await this.connect();
        while (true) {
            const message = await this.receive(ws);
            try {
                const userMessage = new UserMessage(message);
                this.broadcast(JSON.stringify(userMessage));
            } catch (e) {
                console.error(e.message);
            }
        }
    }

    public run() {
        console.log("Server is running on port", port);
        this.loop().then(() => { });
    }
}

new WebSocketServer(port).run();

