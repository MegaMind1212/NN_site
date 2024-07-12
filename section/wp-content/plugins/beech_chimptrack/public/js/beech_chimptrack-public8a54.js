class ChimperLayer {
	constructor( settings = {} ) {
		this.array = [];
		this.active = false;
		this.settings = settings;
		this.uid = this.handleID();
	}

	handleID() {
		// Check if 'mc_eid' parameter exists in the URL
		const urlParams = new URLSearchParams(window.location.search);
		const mc_eidParam = urlParams.get("mc_eid");

		if (mc_eidParam) {
			// Store 'mc_eid' in both localStorage and a cookie
			localStorage.setItem("mc_eid", mc_eidParam);
			document.cookie = `mc_eid=${mc_eidParam}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`;

			return mc_eidParam; // Return the 'mc_eid' parameter value

		} else {
			// Check if 'mc_eid' exists in localStorage
			const mc_eidLocalStorage = localStorage.getItem("mc_eid");
			if (mc_eidLocalStorage) {
				return mc_eidLocalStorage; // Return value from localStorage
			} else {
				// Check if 'mc_eid' exists in cookies
				const cookies = document.cookie.split(";");
				for (let i = 0; i < cookies.length; i++) {
					const cookie = cookies[i].trim();
					if (cookie.startsWith("mc_eid=")) {
					return cookie.substring(7); // Return value from cookie
					}
				}
			}
		}

		return false; // Return false if 'mc_eid' doesn't exist in URL, localStorage, or cookies
	}

	handler( item ) {
		triggerChimp( this.uid, item);
	}

	push( item ) {
		this.array.push(item);
		if (this.uid !== false) { this.handler(item) }
		else { console.warn('Not tracking, dunno who this is') };
	}

	// Other array-like methods can be added as needed
	// For example: pop(), shift(), unshift(), splice(), etc.
	get length() {
		return this.array.length;
	}
}

async function triggerChimp( uid, item ) {
	function formatData( event, properties ) {
		/**
		 * Valid Events
		 *
		 * @values register_user, page_view, signed_up, form_submit, download_resource, signed_petition, accept_referral
		 *
		 **/
		const accepted_values = ["register_user", "page_view", "signed_up", "form_submit", "download_resource", "signed_petition", "accept_referral"];

		if(!accepted_values.includes(event)) return false;

		return { uid, event, properties };
	}

	async function callAPI( data ) {
		const endpoint = "/wp-json/bct/v1/event/";

		// Making a POST request using fetch
		return await fetch(endpoint, {
			method: "POST",
			headers: {
				"Content-Type": "application/json", // Set content type to JSON
			},
			body: JSON.stringify(data), // Convert data to JSON string
			})
			.then((response) => {
				if (!response.ok) {
					throw new Error("Network response was not ok.");
				}
				return response.json(); // Parse the JSON response
			})
			.then((data) => {
				// Handle the response data here (if needed)
				console.log("Response:", data);
				return data;
			})
			.catch((error) => {
				// Handle errors here
				console.error("There was a problem with the fetch operation:", error);
				return error;
		});
	}


	const { event = '', properties = {} } = item;
	const data = formatData(event, properties);

	if(!data) console.warn('This data is shit ', data, event, properties, item)
	if(!data) return false;

	return await callAPI(data);
}

function chimpPageView() {
	const event = 'page_view';
	const properties = {};

	function screenCategory() {
		if(window.innerWidth >= 1920) return ' Large Desktop'
		if(window.innerWidth >= 1200) return 'Desktop'
		if(window.innerWidth >= 1025) return 'Small Desktop'
		if(window.innerWidth >= 481) return 'Tablet'
		return 'Mobile'
	}

	properties.title = document.title;
	properties.page = window.location.pathname;
	properties.hostname = window.location.hostname;
	properties.screenWidth = window.innerWidth + ' ';
	properties.screenHeight = window.innerHeight + ' ';
	properties.screenCategory = screenCategory();

	return { event, properties }
}

window.chimperLayer = new ChimperLayer();


function handleID() {
  // Check if 'mc_eid' parameter exists in the URL
  const urlParams = new URLSearchParams(window.location.search);
  const mc_eidParam = urlParams.get("mc_eid");

  if (mc_eidParam) {
    // Store 'mc_eid' in both localStorage and a cookie
    localStorage.setItem("mc_eid", mc_eidParam);
    document.cookie = `mc_eid=${mc_eidParam}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`;

    return mc_eidParam; // Return the 'mc_eid' parameter value

  } else {
    // Check if 'mc_eid' exists in localStorage
    const mc_eidLocalStorage = localStorage.getItem("mc_eid");
    if (mc_eidLocalStorage) {
      return mc_eidLocalStorage; // Return value from localStorage
    } else {
      // Check if 'mc_eid' exists in cookies
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith("mc_eid=")) {
          return cookie.substring(7); // Return value from cookie
        }
      }
    }
  }

  return false; // Return false if 'mc_eid' doesn't exist in URL, localStorage, or cookies
}

document.addEventListener('DOMContentLoaded', (e) => {
	chimperLayer.push(chimpPageView());
});
/*
// Example usage:
const mc_eidValue = handleID();
console.log("mc_eid value:", mc_eidValue);
*/
/*
https://agency.us14.list-manage.com/track/click?
u=4da1b50eb7df5c616bdf3ee2a


id=332700bcd0
&
e=575670ba7c

https://www.beech.agency/?uniqid=575670ba7c&emol=josh@beech.agency&emol_id=575670ba7c&utm_source=Beech+Agency&utm_campaign=9338dc15f1-Eat+a+bag+of+tests+you+dog%21&utm_medium=email&utm_term=0_7a2cc780a0-9338dc15f1-594292967&mc_cid=9338dc15f1&mc_eid=575670ba7c


https://www.beech.agency/?
uniqid=3936968f02&
emol=lachlan@beech.agency&
emol_id=3936968f02&
utm_source=Beech+Agency&
utm_campaign=9338dc15f1-Eat+a+bag+of+tests+you+dog%21&
utm_medium=email&
utm_term=0_7a2cc780a0-9338dc15f1-603318736&
mc_cid=9338dc15f1&
mc_eid=3936968f02
*/