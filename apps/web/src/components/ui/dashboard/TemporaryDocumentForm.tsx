"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

import { DocumentUpload } from "@/types/documents";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Textarea } from "@/ui/textarea";

interface TemporaryDocumentFormProps {
  userId: string;
  onSubmit: (data: Partial<DocumentUpload>) => Promise<void>;
  onCancel: () => void;
}

export function TemporaryDocumentForm({
  userId,
  onSubmit,
  onCancel,
}: TemporaryDocumentFormProps) {
  const t = useTranslations("temporaryDocumentForm");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      alert(t("selectFileAlert"));
      return;
    }

    onSubmit({
      name: name || t("initialName"),
      description: description || t("initialDescription"),
      file,
      user_id: userId,
    });
  };

  return (
    <div className="space-y-4 p-4">
      <h2 className="text-lg font-medium">{t("formTitle")}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">
            {t("nameLabel")}
          </label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
            placeholder={t("initialName")}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="description" className="text-sm font-medium">
            {t("descriptionLabel")}
          </label>
          <Textarea
            id="description"
            value={description}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setDescription(e.target.value)
            }
            rows={3}
            placeholder={t("initialDescription")}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="file" className="text-sm font-medium">
            {t("fileLabel")}
          </label>
          <Input
            id="file"
            type="file"
            onChange={handleFileChange}
            className="cursor-pointer"
            required
          />
          {file && (
            <p className="text-xs text-muted-foreground mt-1">
              {t("selectedFileInfo", {
                fileName: file.name,
                fileSizeKB: Math.round(file.size / 1024),
              })}
            </p>
          )}
        </div>
        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            {t("cancelButton")}
          </Button>
          <Button type="submit" disabled={!file}>
            {t("uploadButton")}
          </Button>
        </div>
      </form>
    </div>
  );
}
