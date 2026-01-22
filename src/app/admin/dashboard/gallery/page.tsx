
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CopyButton } from './copy-button';
import { AddImageForm } from './add-image-form';
import { DeleteImageButton } from './delete-image-button';

export default function GalleryPage() {
  return (
    <>
      <div className="flex items-center mb-4">
        <h1 className="text-lg font-semibold md:text-2xl">Image Gallery</h1>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle>Available Images</CardTitle>
                    <CardDescription>
                        These are the images available in <code className="bg-muted px-1 rounded-sm">src/lib/placeholder-images.json</code>. Use the "Copy ID" button to easily use an image in any of the content management pages.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                        {PlaceHolderImages.map((image) => (
                            <Card key={image.id} className="overflow-hidden flex flex-col">
                                <div className="relative aspect-video bg-muted">
                                    <Image
                                        src={image.imageUrl}
                                        alt={image.description}
                                        fill
                                        className="object-cover"
                                        unoptimized // Important for base64 URLs
                                    />
                                </div>
                                <div className="p-4 flex-grow flex flex-col">
                                    <CardTitle className="text-base font-medium truncate">{image.id}</CardTitle>
                                    <p className="text-sm text-muted-foreground h-10 overflow-hidden mt-1 flex-grow">{image.description}</p>
                                </div>
                                <CardFooter className="flex justify-between gap-2">
                                   <CopyButton textToCopy={image.id} />
                                   <DeleteImageButton imageId={image.id} />
                                </CardFooter>
                            </Card>
                        ))}
                         {PlaceHolderImages.length === 0 && (
                            <div className="col-span-full flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm p-12 text-center">
                                <div className="flex flex-col items-center gap-1">
                                    <h3 className="text-2xl font-bold tracking-tight">No Images Found</h3>
                                    <p className="text-sm text-muted-foreground">Add an image using the form to get started.</p>
                                </div>
                            </div>
                        )}
                    </div>
                </CardContent>
           </Card>
        </div>
        <div>
            <AddImageForm />
        </div>
      </div>
    </>
  );
}
