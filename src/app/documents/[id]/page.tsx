"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DocumentEditor } from "@/components/document/document-editor";
import { Skeleton } from "@/components/ui/skeleton";
import { useArtifact } from "@/contexts/artifact-context";
import { Badge } from "@/components/ui/badge";
import { Eye, EyeOff, ArrowLeft, Trash2 } from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Artifact, ArtifactVisibility } from "@/types/artifact";

export default function DocumentViewPage() {
    const params = useParams();
    const router = useRouter();
    const { artifacts, deleteArtifact, updateArtifactVisibility } = useArtifact();
    const [document, setDocument] = useState<Artifact | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (artifacts) {
            const doc = artifacts.find((a) => a.id === params.id);
            setDocument(doc || null);
            setIsLoading(false);
        }
    }, [artifacts, params.id]);

    const handleDelete = async () => {
        if (document) {
            await deleteArtifact(document.id);
            router.push("/documents");
        }
    };

    const handleToggleVisibility = async () => {
        if (document) {
            const newVisibility: ArtifactVisibility = document.visibility === 'public' ? 'private' : 'public';
            await updateArtifactVisibility(document.id, newVisibility);
            setDocument({
                ...document,
                visibility: newVisibility,
            });
        }
    };

    const handleSaveEdit = async (updatedDoc: Partial<Artifact>) => {
        if (document) {
            setDocument({
                ...document,
                ...updatedDoc,
            });
            setIsEditing(false);
        }
    };

    if (isLoading) {
        return (
            <div className="container py-8">
                <div className="flex items-center mb-6">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <Skeleton className="h-8 w-48 ml-4" />
                </div>
                <Skeleton className="h-8 w-full mb-4" />
                <Skeleton className="h-64 w-full rounded-md" />
            </div>
        );
    }

    if (!document) {
        return (
            <div className="container py-8">
                <Button variant="outline" onClick={() => router.push("/documents")} className="mb-6">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Documents
                </Button>
                <Card className="p-8 text-center">
                    <h2 className="text-2xl font-bold mb-2">Document Not Found</h2>
                    <p className="text-muted-foreground mb-4">
                        The document you are looking for does not exist or has been deleted.
                    </p>
                    <Button onClick={() => router.push("/documents")}>
                        Return to Documents
                    </Button>
                </Card>
            </div>
        );
    }

    const isPublic = document.visibility === 'public';

    return (
        <div className="container py-8">
            <Button variant="outline" onClick={() => router.push("/documents")} className="mb-6">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Documents
            </Button>

            <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold">{document.title}</h1>
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleToggleVisibility}
                    >
                        {isPublic ? (
                            <>
                                <Eye className="mr-2 h-4 w-4" />
                                Public
                            </>
                        ) : (
                            <>
                                <EyeOff className="mr-2 h-4 w-4" />
                                Private
                            </>
                        )}
                    </Button>
                    <Button
                        variant={isEditing ? "outline" : "default"}
                        size="sm"
                        onClick={() => setIsEditing(!isEditing)}
                    >
                        {isEditing ? "Cancel Edit" : "Edit Document"}
                    </Button>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="destructive" size="sm">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete the
                                    document and remove its data from our servers.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={handleDelete}>
                                    Delete
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>

            <div className="mb-6 flex gap-2">
                <Badge variant={isPublic ? "default" : "outline"}>
                    {isPublic ? "Public" : "Private"}
                </Badge>
                <Badge variant="secondary">{document.type || "Document"}</Badge>
                {document.created_at && (
                    <Badge variant="outline">
                        Created: {new Date(document.created_at).toLocaleDateString()}
                    </Badge>
                )}
            </div>

            {isEditing ? (
                <DocumentEditor
                    initialDocument={document}
                    onSave={handleSaveEdit}
                    onCancel={() => setIsEditing(false)}
                />
            ) : (
                <Card className="p-6 mb-6">
                    <div className="prose dark:prose-invert max-w-none">
                        <h2 className="text-xl font-semibold mb-2">{document.title}</h2>
                        {document.description && (
                            <p className="text-muted-foreground mb-4">{document.description}</p>
                        )}
                        <div className="whitespace-pre-wrap">
                            {typeof document.content === 'object' && document.content.text
                                ? document.content.text
                                : (typeof document.content === 'string'
                                    ? document.content
                                    : JSON.stringify(document.content, null, 2))}
                        </div>
                    </div>
                </Card>
            )}
        </div>
    );
} 