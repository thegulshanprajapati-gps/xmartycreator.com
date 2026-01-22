
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { addImageToGallery } from '@/app/admin/dashboard/actions';
import { useActionState, useEffect, useRef, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal, ImagePlus, Upload } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

export function AddImageForm() {
    const [state, formAction, isPending] = useActionState(addImageToGallery, { message: '' });
    const { toast } = useToast();
    const formRef = useRef<HTMLFormElement>(null);
    const [imageUrl, setImageUrl] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (state?.message) {
            const isError = state.message.startsWith('Error:');
            toast({
                title: isError ? 'Error!' : 'Success!',
                description: state.message,
                variant: isError ? 'destructive' : 'default',
            });
            if (!isError) {
                formRef.current?.reset();
                setImageUrl('');
            }
        }
    }, [state, toast]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const triggerFileSelect = () => {
        fileInputRef.current?.click();
    };

  return (
    <Card>
        <CardHeader>
            <CardTitle>Add New Image</CardTitle>
            <CardDescription>Add a new image by providing a URL or uploading from your device.</CardDescription>
        </CardHeader>
        <CardContent>
            <form ref={formRef} action={formAction} className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="id">Image ID</Label>
                    <Input
                        id="id"
                        name="id"
                        placeholder="e.g. new-course-hero"
                        required
                    />
                    <p className="text-xs text-muted-foreground">A unique ID for the image (no spaces).</p>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="local-upload">Local Upload (Workaround)</Label>
                    <Input 
                        id="local-upload-input"
                        name="local-upload"
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                    />
                    <Button type="button" variant="outline" onClick={triggerFileSelect} className="w-full">
                        <Upload className="mr-2 h-4 w-4" />
                        Choose File from Device
                    </Button>
                    <p className="text-xs text-muted-foreground">This converts the image to a Data URL and fills the field below.</p>
                </div>

                 <div className="space-y-2">
                    <Label htmlFor="imageUrl">Image URL</Label>
                    <Textarea
                        id="imageUrl"
                        name="imageUrl"
                        placeholder="https://example.com/image.jpg or select a local file"
                        required
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        className="min-h-[100px]"
                    />
                     <p className="text-xs text-muted-foreground">The direct link to the image (will be auto-filled on local upload).</p>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                        id="description"
                        name="description"
                        placeholder="A brief description of the image."
                        required
                    />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="imageHint">AI Hint (Optional)</Label>
                    <Input
                        id="imageHint"
                        name="imageHint"
                        placeholder="e.g. abstract blue"
                    />
                     <p className="text-xs text-muted-foreground">1-2 keywords for AI image search.</p>
                </div>
              
                {state?.message && state.message.startsWith('Error:') && (
                  <Alert variant="destructive" className="mt-4">
                    <Terminal className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{state.message.replace('Error: ', '')}</AlertDescription>
                  </Alert>
                )}

                <Button type="submit" className="w-full" disabled={isPending}>
                    <ImagePlus className="mr-2" />
                  {isPending ? 'Adding Image...' : 'Add Image to Gallery'}
                </Button>
            </form>
        </CardContent>
    </Card>
  );
}
