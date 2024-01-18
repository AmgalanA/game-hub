'use client'

import { AlertTriangle } from 'lucide-react'
import { IngressInput } from 'livekit-server-sdk'
import { useState, useTransition, useRef, ElementRef } from 'react'
import { toast } from 'sonner'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { createIngress } from '@/actions/ingress'

const RTMP = String(IngressInput.RTMP_INPUT);
const WHIP = String(IngressInput.WHIP_INPUT);

type IngressType = typeof RTMP | typeof WHIP

const ConnectModal = () => {
    const closeRef = useRef<ElementRef<"button">>(null)

    const [ingressType, setIngressType] = useState<IngressType>(RTMP);

    const [isPending, startTransition] = useTransition();

    const onSubmit = () => {
        startTransition(() => {
            createIngress(parseInt(ingressType))
                .then(() => {
                    toast.success('Ingress created')
                    closeRef.current?.click()
                })
                .catch((error) => 
                    toast.error('Something went wrong')
                )
        })
    }

  return (
    <Dialog>
        <DialogTrigger>
            <Button variant='primary'>
                Generate connection
            </Button>
        </DialogTrigger>

        <DialogContent>
            <DialogHeader>
                <DialogTitle>Generate connection</DialogTitle>
            </DialogHeader>

            <Select
                disabled={isPending}
                value={ingressType}
                onValueChange={value => setIngressType(value)}
            >
                <SelectTrigger className='w-full'>
                    <SelectValue placeholder="Ingress type" />
                </SelectTrigger>

                <SelectContent>
                    <SelectItem value={RTMP}>RTMP</SelectItem>
                    <SelectItem value={WHIP}>WHIP</SelectItem>
                </SelectContent>
            </Select>

            <Alert>
                <AlertTriangle 
                    className='h-4 w-4'
                />

                <AlertTitle>Warning!</AlertTitle>

                <AlertDescription>
                    This action will reset all active streams using the current connection
                </AlertDescription>
            </Alert>

            <div className='flex justify-between'>
                <DialogClose ref={closeRef} asChild>
                    <Button variant='ghost'>
                        Cancel
                    </Button>
                </DialogClose>

                <Button
                    disabled={isPending}
                    onClick={onSubmit}
                    variant='primary'
                >
                    Generate
                </Button>
            </div>
        </DialogContent>
    </Dialog>
  )
}

export default ConnectModal