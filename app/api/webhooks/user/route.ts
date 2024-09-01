import { db } from "@/lib/db";
import { IncomingHttpHeaders } from "http";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook, WebhookRequiredHeaders } from "svix";

const webhookSecret = process.env.WEBHOOK_SECRET || "";

async function handler(request: Request) {
    const payload = await request.json();
    const headersList = headers();
    const heads = {
        "svix-id": headersList.get("svix-id"),
        "svix-timestamp": headersList.get("svix-timestamp"),
        "svix-signature": headersList.get("svix-signature"),
    };
    const wh = new Webhook(webhookSecret);
    let evt: Event | null = null;

    try {
        evt = wh.verify(
            JSON.stringify(payload),
            heads as IncomingHttpHeaders & WebhookRequiredHeaders
        ) as Event;
    } catch (err) {
        console.error((err as Error).message);
        return NextResponse.json({}, { status: 400 });
    }

    const eventType: EventType = evt.type;
    if (eventType === "user.updated") {
        const { id, ...attributes } = evt.data;
        const imageUrl = attributes.image_url as string;
        const firstName = attributes.first_name as string;
        const lastName = attributes.last_name as string;
        const email = (attributes.email_addresses[0]?.email_address as string) || "";

        const profile = await db.profile.findFirst({
            where: {
                email,
            },
        });

        if (!profile) {
            return NextResponse.json({}, { status: 404 });
        }

        await db.profile.update({
            where: {
                id: profile.id,
            },
            data: {
                imageUrl,
                name: `${firstName} ${lastName}`,
                email,
            },
        });
    }

    return NextResponse.json({}, { status: 200 });
}

type EventType = "user.updated" | "*";

type Event = {
    data: any;
    object: "event";
    type: EventType;
};

export const GET = handler;
export const POST = handler;
export const PUT = handler;
