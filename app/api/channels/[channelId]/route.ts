import { NextResponse } from "next/server";
import { MemberRole } from "@prisma/client";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

export async function DELETE(req: Request, { params }: { params: { channelId: string } }) {
    try {
        const profile = await currentProfile();
        const { searchParams } = new URL(req.url);

        const serverId = searchParams.get("serverId");

        if (!profile) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!serverId) {
            return new NextResponse("Server ID missing", { status: 400 });
        }

        if (!params.channelId) {
            return new NextResponse("Channel ID missing", { status: 400 });
        }

        const server = await db.server.update({
            where: {
                id: serverId,
                members: {
                    some: {
                        profileId: profile.id,
                        role: {
                            in: [MemberRole.ADMIN, MemberRole.MODERATOR],
                        },
                    },
                },
            },
            data: {
                channels: {
                    delete: {
                        id: params.channelId,
                        name: {
                            not: "general",
                        },
                    },
                },
            },
        });

        if (!server) {
            return new NextResponse("Server not found", { status: 404 });
        }

        return NextResponse.json(server);
    } catch (error) {
        console.log("[CHANNEL_ID] DELETE EROOR", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export async function PATCH(req: Request, { params }: { params: { channelId: string } }) {
    try {
        const profile = await currentProfile();
        const { name, type } = await req.json();
        const { searchParams } = new URL(req.url);

        const serverId = searchParams.get("serverId");

        if (!profile) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!serverId) {
            return new NextResponse("Server ID missing", { status: 400 });
        }

        if (!params.channelId) {
            return new NextResponse("Channel ID missing", { status: 400 });
        }

        if (name === "general") {
            return new NextResponse("Cannot rename general channel", { status: 400 });
        }

        const server = await db.server.update({
            where: {
                id: serverId,
                members: {
                    some: {
                        profileId: profile.id,
                        role: {
                            in: [MemberRole.ADMIN, MemberRole.MODERATOR],
                        },
                    },
                },
            },
            data: {
                channels: {
                    update: {
                        where: {
                            id: params.channelId,
                            NOT: {
                                name: "general",
                            },
                        },
                        data: {
                            name,
                            type,
                        },
                    },
                },
            },
        });

        if (!server) {
            return new NextResponse("Server not found", { status: 404 });
        }

        return NextResponse.json(server);
    } catch (error) {
        console.log("[CHANNEL_ID] PATCH EROOR", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
