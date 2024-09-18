import { Reclaim } from '@reclaimprotocol/js-sdk'
import {v4 as uuidv4} from 'uuid';

interface SessionResponse {
    message: string;
    session: {
      id: string;
      appId: string;
      httpProviderId: string[];
      sessionId: string;
      proofs: any[]; 
      status: string;
      statusV2: string;
      createdAt: string; 
      updatedAt: string;
    };
    providerId: string;
  }


export async function LinkedinAuth() {
    console.log("Linkedin auth called")

    const APP_ID = "0x51DE654971aEBdfE021f98519682eC4cE0E31425"
    const sessionId = uuidv4()
    const reclaimClient = new Reclaim.ProofRequest(APP_ID, { sessionId })
    
    reclaimClient.addContext(
        (`to be added`),
        ('to be added')
    )

    await reclaimClient.buildProofRequest('cf639387-597b-442d-a638-2d2bb0eea575')

    reclaimClient.setSignature(
        await reclaimClient.generateSignature(
            "0x25ec948d2927bd3b3382d7a9c0a1cbfa38ac137111c4f2d33c5149a6803f67a3"
        )
    )

    const { requestUrl, statusUrl } = await reclaimClient.createVerificationRequest();

    return {requestUrl,statusUrl}
}

export async function GoogleAuth(){
    console.log("Google Auth in Progress")

    const APP_ID = "0x51DE654971aEBdfE021f98519682eC4cE0E31425"
    console.log(APP_ID)
    const sessionId : string = uuidv4()
    console.log(sessionId)
    const reclaimClient = new Reclaim.ProofRequest(APP_ID, { sessionId })
    console.log(sessionId)
    reclaimClient.addContext(
        (`to be added`),
        ('to be added')
    )

    await reclaimClient.buildProofRequest('f9f383fd-32d9-4c54-942f-5e9fda349762')

    reclaimClient.setSignature(
        await reclaimClient.generateSignature(
            "0x25ec948d2927bd3b3382d7a9c0a1cbfa38ac137111c4f2d33c5149a6803f67a3"
        )
    )

    const { requestUrl, statusUrl } = await reclaimClient.createVerificationRequest();

    return {requestUrl,statusUrl}
}

export function IsVerified(statusUrl: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const intervalId = setInterval(async () => {
        try {
          const response = await fetch(statusUrl);
          const status: SessionResponse = await response.json();
  
          if (status.session.status === "MOBILE_SUBMITTED") {
            console.log("Session verified");
            clearInterval(intervalId); 

            //TODO : upload session details to the database
            //TODO : The function should perform both login and signup process verification

            resolve(status.session.sessionId);
          }
        } catch (error) {
          console.error("Error fetching session status:", error);
          clearInterval(intervalId);
          reject(error); 
        }
      }, 2000);
    });
  }
  