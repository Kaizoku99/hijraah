import { toast } from "sonner";

import { Artifact } from "@/components/ui/create-artifact";
import { CodeEditor } from "@/components/ui/code-editor";
import {
  Console,
  ConsoleOutput,
  ConsoleOutputContent,
} from "@/components/ui/console";
import {
  CopyIcon,
  LogsIcon,
  MessageIcon,
  PlayIcon,
  RedoIcon,
  UndoIcon,
} from "@/components/ui/icons";
import { generateUUID } from "@/lib/utils";

const OUTPUT_HANDLERS = {
  matplotlib: `
    import io
    import base64
    from matplotlib import pyplot as plt

    # Clear any existing plots
    plt.clf()
    plt.close('all')

    # Switch to agg backend
    plt.switch_backend('agg')

    def setup_matplotlib_output():
        def custom_show():
            if plt.gcf().get_size_inches().prod() * plt.gcf().dpi ** 2 > 25_000_000:
                print("Warning: Plot size too large, reducing quality")
                plt.gcf().set_dpi(100)

            png_buf = io.BytesIO()
            plt.savefig(png_buf, format='png')
            png_buf.seek(0)
            png_base64 = base64.b64encode(png_buf.read()).decode('utf-8')
            print(f'data:image/png;base64,{png_base64}')
            png_buf.close()

            plt.clf()
            plt.close('all')

        plt.show = custom_show
  `,
  basic: `
    # Basic output capture setup
  `,
};

function detectRequiredHandlers(code: string): string[] {
  const handlers: string[] = ["basic"];

  if (code.includes("matplotlib") || code.includes("plt.")) {
    handlers.push("matplotlib");
  }

  return handlers;
}

interface Metadata {
  outputs: Array<ConsoleOutput>;
}

export const codeArtifact = new Artifact<"code", Metadata>({
  kind: "code",
  description:
    "Useful for code generation; Code execution is only available for python code.",
  initialize: async ({
    setMetadata,
  }: {
    setMetadata: (metadata: Metadata) => void;
  }) => {
    setMetadata({
      outputs: [],
    });
  },
  onStreamPart: ({
    streamPart,
    setArtifact,
  }: {
    streamPart: any;
    setArtifact: (updater: (draftArtifact: any) => any) => void;
  }) => {
    if (streamPart.type === "code-delta") {
      setArtifact((draftArtifact: any) => ({
        ...draftArtifact,
        content: streamPart.content as string,
        isVisible:
          draftArtifact.status === "streaming" &&
          draftArtifact.content.length > 300 &&
          draftArtifact.content.length < 310
            ? true
            : draftArtifact.isVisible,
        status: "streaming",
      }));
    }
  },
  content: ({
    metadata,
    setMetadata,
    content,
    onSaveContent,
    status,
    isCurrentVersion,
    currentVersionIndex,
    suggestions,
  }: {
    metadata: Metadata;
    setMetadata: (metadata: Metadata) => void;
    content: string;
    onSaveContent: (updatedContent: string, debounce: boolean) => void;
    status: "streaming" | "idle";
    isCurrentVersion: boolean;
    currentVersionIndex: number;
    suggestions: Array<any>;
  }) => {
    return (
      <>
        <div className="px-1">
          <CodeEditor
            content={content}
            onSaveContent={onSaveContent}
            status={status}
            isCurrentVersion={isCurrentVersion}
            currentVersionIndex={currentVersionIndex}
            suggestions={suggestions}
          />
        </div>

        {metadata?.outputs && (
          <Console
            consoleOutputs={metadata.outputs}
            setConsoleOutputs={() => {
              setMetadata({
                ...metadata,
                outputs: [],
              });
            }}
          />
        )}
      </>
    );
  },
  actions: [
    {
      icon: <PlayIcon size={18} />,
      label: "Run",
      description: "Execute code",
      onClick: async ({
        content,
        setMetadata,
      }: {
        content: string;
        setMetadata: (updater: (metadata: Metadata) => Metadata) => void;
      }) => {
        const runId = generateUUID();
        const outputContent: Array<ConsoleOutputContent> = [];

        setMetadata((metadata: Metadata) => ({
          ...metadata,
          outputs: [
            ...metadata.outputs,
            {
              id: runId,
              contents: [],
              status: "in_progress",
            },
          ],
        }));

        try {
          // @ts-expect-error - loadPyodide is not defined
          const currentPyodideInstance = await globalThis.loadPyodide({
            indexURL: "https://cdn.jsdelivr.net/pyodide/v0.23.4/full/",
          });

          currentPyodideInstance.setStdout({
            batched: (output: string) => {
              outputContent.push({
                type: output.startsWith("data:image/png;base64")
                  ? "image"
                  : "text",
                value: output,
              });
            },
          });

          await currentPyodideInstance.loadPackagesFromImports(content, {
            messageCallback: (message: string) => {
              setMetadata((metadata: Metadata) => ({
                ...metadata,
                outputs: [
                  ...metadata.outputs.filter(
                    (output: ConsoleOutput) => output.id !== runId,
                  ),
                  {
                    id: runId,
                    contents: [{ type: "text", value: message }],
                    status: "loading_packages",
                  },
                ],
              }));
            },
          });

          const requiredHandlers = detectRequiredHandlers(content);
          for (const handler of requiredHandlers) {
            if (OUTPUT_HANDLERS[handler as keyof typeof OUTPUT_HANDLERS]) {
              await currentPyodideInstance.runPythonAsync(
                OUTPUT_HANDLERS[handler as keyof typeof OUTPUT_HANDLERS],
              );

              if (handler === "matplotlib") {
                await currentPyodideInstance.runPythonAsync(
                  "setup_matplotlib_output()",
                );
              }
            }
          }

          await currentPyodideInstance.runPythonAsync(content);

          setMetadata((metadata: Metadata) => ({
            ...metadata,
            outputs: [
              ...metadata.outputs.filter(
                (output: ConsoleOutput) => output.id !== runId,
              ),
              {
                id: runId,
                contents: outputContent,
                status: "completed",
              },
            ],
          }));
        } catch (error: any) {
          setMetadata((metadata: Metadata) => ({
            ...metadata,
            outputs: [
              ...metadata.outputs.filter(
                (output: ConsoleOutput) => output.id !== runId,
              ),
              {
                id: runId,
                contents: [{ type: "text", value: error.message }],
                status: "failed",
              },
            ],
          }));
        }
      },
    },
    {
      icon: <UndoIcon size={18} />,
      description: "View Previous version",
      onClick: ({
        handleVersionChange,
      }: {
        handleVersionChange: (
          type: "next" | "prev" | "toggle" | "latest",
        ) => void;
      }) => {
        handleVersionChange("prev");
      },
      isDisabled: ({
        currentVersionIndex,
      }: {
        currentVersionIndex: number;
      }) => {
        if (currentVersionIndex === 0) {
          return true;
        }

        return false;
      },
    },
    {
      icon: <RedoIcon size={18} />,
      description: "View Next version",
      onClick: ({
        handleVersionChange,
      }: {
        handleVersionChange: (
          type: "next" | "prev" | "toggle" | "latest",
        ) => void;
      }) => {
        handleVersionChange("next");
      },
      isDisabled: ({ isCurrentVersion }: { isCurrentVersion: boolean }) => {
        if (isCurrentVersion) {
          return true;
        }

        return false;
      },
    },
    {
      icon: <CopyIcon size={18} />,
      description: "Copy code to clipboard",
      onClick: ({ content }: { content: string }) => {
        navigator.clipboard.writeText(content);
        toast.success("Copied to clipboard!");
      },
    },
  ],
  toolbar: [
    {
      icon: <MessageIcon />,
      description: "Add comments",
      onClick: ({ appendMessage }) => {
        appendMessage({
          role: "user",
          content: "Add comments to the code snippet for understanding",
        });
      },
    },
    {
      icon: <LogsIcon />,
      description: "Add logs",
      onClick: ({ appendMessage }) => {
        appendMessage({
          role: "user",
          content: "Add logs to the code snippet for debugging",
        });
      },
    },
  ],
});
