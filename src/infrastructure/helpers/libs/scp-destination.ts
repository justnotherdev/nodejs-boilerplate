/* eslint-disable camelcase */
import querystring from 'querystring';
import axios from 'axios';
import xsenv from '@sap/xsenv';
import btoa from 'btoa';

export class SCPDestinations {
	static async getDestinationInfo(destSrvInstance: string, destName: string): Promise<any> {
		try {
			// Get Service Credentials (Technical User)
			const { dest } = xsenv.getServices({
				dest: destSrvInstance
			});
			// Structure and parse to Base64 the UAA Token
			const sDestCreds = `${dest.clientid}:${dest.clientsecret}`;
			const b64DestCreds = btoa(sDestCreds);
			// Get UAA Token
			const { data } = await axios.post(
				`${dest.url}/oauth/token`,
				// ESTA SECCION DEBE CAMBIARSE PARA QUE USE URLSearchParams YA QUE QUERYSTRING ESTA DEPRECADO
				querystring.stringify({
					client_id: dest.clientid,
					grant_type: 'client_credentials'
				}),
				{
					headers: {
						Authorization: `Basic ${b64DestCreds}`,
						'Content-type': 'application/x-www-form-urlencoded'
					}
				}
			);
			// Extract Token
			const sToken: string = data.access_token;
			// Get Destination Information (with obtained token)
			const oDestination = await axios.get(`${dest.uri}/destination-configuration/v1/destinations/${destName}`, {
				headers: {
					Authorization: `Bearer ${sToken}`
				}
			});
			// Return Destination Information
			return oDestination.data;
		} catch (error) {
			throw new Error((error as Error).message || 'Internal Server Error');
		}
	}
}
