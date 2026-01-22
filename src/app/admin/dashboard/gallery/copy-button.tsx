
'use client';

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Copy } from "lucide-react";
import { useState } from "react";

interface CopyButtonProps {
    textToCopy: string;
}

export function CopyButton({ textToCopy }: CopyButtonProps) {
    const { toast } = useToast();
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(textToCopy);
            setIsCopied(true);
            toast({
                title: 'Copied!',
                description: `ID "${textToCopy}" copied to clipboard.`,
            });
            setTimeout(() => setIsCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy: ', err);
            toast({
                variant: 'destructive',
                title: 'Failed to copy',
                description: 'Could not copy ID to clipboard.',
            });
        }
    };

    return (
        <Button variant="outline" onClick={handleCopy} disabled={isCopied}>
            <Copy className="mr-2 h-4 w-4"/>
            {isCopied ? 'Copied!' : 'Copy ID'}
        </Button>
    );
}
