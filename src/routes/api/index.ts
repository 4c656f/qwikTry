import {RequestHandler} from "@builder.io/qwik-city";


export const onGet: RequestHandler<string> = ({}) => {

    return 'Hi this is root route of api'
}