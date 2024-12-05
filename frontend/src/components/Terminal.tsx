interface TerminalProps {
  output: string;
}

export default function Terminal({ output }: TerminalProps) {
  return (
    <div className="h-64 bg-gray-900 text-gray-100 p-4 font-mono text-sm overflow-y-auto">
      <div className="mb-2 flex items-center space-x-2">
        <div className="h-3 w-3 rounded-full bg-red-500" />
        <div className="h-3 w-3 rounded-full bg-yellow-500" />
        <div className="h-3 w-3 rounded-full bg-green-500" />
      </div>
      <pre className="whitespace-pre-wrap">{output || '> Ready'}</pre>
    </div>
  );
} 