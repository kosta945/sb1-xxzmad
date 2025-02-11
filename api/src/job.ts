import { randomBetween } from '@std/random/between'

import * as Sms from './sms.ts'

export interface Item {
    readonly description: string
    readonly delivered: boolean
}

export function item(description: string) {
    return {
        description,
        delivered: false,
    }
}

// maybe job needs a sender and an origin contact to be separate

export interface Job {
    readonly id: string
    readonly created: Date
    readonly updated: Date

    readonly status: 'Waiting' | 'Transit' | 'Completed'
    readonly sender: Contact
    readonly receiver: Contact
    readonly courier: Contact
    readonly origin: Location
    readonly destination: Location
    readonly items: Item[]

    readonly code: number
}

export interface Contact {
    readonly name: string
    readonly phone: string
    readonly email: string
}

export interface Location {
    readonly address: string
}

const senderPh = Deno.env.get('SENDER_PHONE') || '+4444444444'
const receiverPh = Deno.env.get('RECEIVER_PHONE') || '+8888888888'
const courierPh = Deno.env.get('COURIER_PHONE') || '+9999999999'

const sender = {
    name: 'ntr',
    phone: senderPh,
    email: 'ntr@podowl.north',
}

const courier = {
    name: 'adri',
    phone: receiverPh,
    email: 'adri@bp.p',
}

const receiver = {
    name: 'kotsi',
    phone: courierPh,
    email: 'kotsi@podowl.west',
}

const origin = {
    address: 'kitchen, your place, westside 0420',
}

const destination = {
    address: 'couch, your place, westside 0420',
}

const items = [
    item('hot tea'),
]

export function newJob(): Job {
    return {
        id: crypto.randomUUID(),
        created: new Date(),
        updated: new Date(),
        status: 'Waiting',

        sender,
        receiver,
        courier,

        origin,
        destination,
        items,
        code: Math.floor(randomBetween(1000, 10000)),
    }
}

export async function onWaiting(job: Job) {
    const results = await Promise.all([
        Sms.sendSms(job.courier.phone, Sms.onWaitingCourier(job)),
        Sms.sendSms(job.sender.phone, Sms.onWaitingSender(job)),
        Sms.sendSms(job.receiver.phone, Sms.onWaitingReceiver(job)),
    ])

    console.log(results)
}

export async function onTransit(job: Job) {
    const results = await Promise.all([
        Sms.sendSms(job.courier.phone, Sms.onTransitCourier(job)),
        Sms.sendSms(job.sender.phone, Sms.onTransitSender(job)),
        Sms.sendSms(job.receiver.phone, Sms.onTransitReceiver(job)),
    ])

    console.log(results)
}

export async function onComplete(job: Job) {
    const results = await Promise.all([
        Sms.sendSms(job.sender.phone, Sms.onCompleteSender(job)),
        // Sms.sendSms(job.receiver.phone, Sms.onWaitingReceiver(job)),
        // Sms.sendSms(job.courier.phone, Sms.onWaitingCourier(job)),
    ])

    console.log(results)
}
