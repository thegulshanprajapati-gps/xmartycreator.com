
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import initialNotificationContent from '@/content/notification.json';
import { useActionState, useEffect, useState } from 'react';
import { updateNotificationContent } from '../actions';
import { useToast } from '@/hooks/use-toast';
import { Switch } from '@/components/ui/switch';


type NotificationContent = typeof initialNotificationContent;

export default function AdminNotificationPage() {
  const [state, formAction, isPending] = useActionState(updateNotificationContent, { message: '', data: initialNotificationContent });
  const { toast } = useToast();
  const [content, setContent] = useState<NotificationContent>(initialNotificationContent);
  const [isEnabled, setIsEnabled] = useState(initialNotificationContent.enabled);

  useEffect(() => {
    if (state?.message) {
      toast({
        title: state.message.includes('Failed') ? 'Error!' : 'Success!',
        description: state.message,
        variant: state.message.includes('Failed') ? 'destructive' : 'default',
      });
    }
    if (state?.data) {
        setContent(state.data as NotificationContent);
        setIsEnabled(state.data.enabled);
    }
  }, [state, toast]);

  return (
    <form action={formAction}>
        <div className="flex items-center justify-between gap-4 mb-4">
            <h1 className="text-lg font-semibold md:text-2xl">Notification Banner</h1>
            <Button type="submit" disabled={isPending}>{isPending ? 'Saving...' : 'Save Changes'}</Button>
        </div>
        <Card className="mt-4">
            <CardHeader>
                <CardTitle>Edit Notification Banner</CardTitle>
                <CardDescription>Control the content and visibility of the site-wide notification banner.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
                <div className="flex items-center space-x-2">
                    <Switch id="enabled" name="enabled" checked={isEnabled} onCheckedChange={setIsEnabled} />
                    <Label htmlFor="enabled">Enable Notification Banner</Label>
                </div>
                
                <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea 
                        id="message" 
                        name="message" 
                        defaultValue={content.message} 
                        placeholder="e.g. <span class='font-bold'>New!</span> {link}"
                    />
                    <p className="text-sm text-muted-foreground">
                      Use HTML for styling and {'{link}'} as a placeholder where the link should appear.
                    </p>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="linkText">Link Text</Label>
                    <Input 
                        id="linkText" 
                        name="linkText" 
                        defaultValue={content.linkText} 
                        placeholder="e.g. Check out our new course!"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="linkHref">Link URL</Label>
                    <Input 
                        id="linkHref" 
                        name="linkHref" 
                        defaultValue={content.linkHref} 
                        placeholder="e.g. /courses"
                    />
                </div>
            </CardContent>
        </Card>
    </form>
  );
}
