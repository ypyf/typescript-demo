interface Message {
    id: string;
    message: string;
}

export class UserMessage implements Message {
    private data: { id: string; message: string };

    constructor(payload: string) {
        var data = JSON.parse(payload);
        if (!data.id || !data.message) {
            throw new Error("接收到无效的消息体: " + payload);
        }
        this.data = data;
    }

    get id(): string {
        return this.data.id;
    }

    get message(): string {
        return this.data.message;
    }
}