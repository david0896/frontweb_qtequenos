import { fetcher } from "./api";

export async function emailSend(setAlert, message){

    const responseData = await fetcher(
        `/api/sendNondeMailer`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            message
        }),
        },
        setAlert
      );

      console.log(responseData)
}