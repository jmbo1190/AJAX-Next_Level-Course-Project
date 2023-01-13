function AjaxLib(){

    this.xhr = new XMLHttpRequest();



    // ******* GET REQUEST ********

    this.get = (url, callback) => {
        this.xhr.open("GET", url);
        this.xhr.onload = () => {
            if (this.xhr.status === 200) {
                let data = this.xhr.response;
                let JSobj = JSON.parse(data);
                let err = null;
                callback(err, JSobj);
            } else {
                let JSobj = null;
                let err = `Error in GET request (status: ${this.xhr.status}) to ${url}`;
                callback(err, JSobj);
            }
        };
        this.xhr.onerror = (err) => {
            console.log("An Error occurred during GET request, with status: " + err.currentTarget.status)
        }
        this.xhr.send();
    };


    // ******* POST REQUEST ********

    this.post = (url, body, callback) => {
        this.xhr.open("POST", url);
        // even if servers sometime ignore it, it's good practice to set the Content-Type Header
        // to inform it of the type of data being sent
        this.xhr.setRequestHeader('Content-Type', 'application/json');
        this.xhr.onload = () => {
            if (this.xhr.status === 200) {
                // access the data (object with message) sent back to us by the server
                let data = this.xhr.response;
                let JSobj = JSON.parse(data);
                let err = null;
                callback(err, JSobj);
            } else {
                let JSobj = null;
                let err = `Error in POST request (status: ${this.xhr.status}) to ${url}`;
                callback(err, JSobj);
            }
        };
        this.xhr.onerror = (err) => {
            console.log("An Error occurred during POST request, with status: " + err.currentTarget.status)
        }
        this.xhr.send(JSON.stringify(body));
    };




    // ******* PUT REQUEST ********

    this.put = (url, body, callback) => {
        this.xhr.open("PUT", url);
        // even if servers sometime ignore it, it's good practice to set the Content-Type Header
        // to inform it of the type of data being sent
        this.xhr.setRequestHeader('Content-Type', 'application/json');
        this.xhr.onload = () => {
            if (this.xhr.status === 200) {
                // access the data (object with message) sent back to us by the server
                let data = this.xhr.response;
                let JSobj = JSON.parse(data);
                let err = null;
                callback(err, JSobj);
            } else {
                let JSobj = null;
                let err = `Error in PUT request (status: ${this.xhr.status}) to ${url}`;
                callback(err, JSobj);
            }
        };
        this.xhr.onerror = (err) => {
            console.log("An Error occurred during PUT request, with status: " + err.currentTarget.status)
        }
        this.xhr.send(JSON.stringify(body));
    };




    // ******* DELETE REQUEST ********

    this.delete = (url, callback) => {
        this.xhr.open("DELETE", url);
        // even if servers sometime ignore it, it's good practice to set the Content-Type Header
        // to inform it of the type of data being sent
        this.xhr.onload = () => {
            if (this.xhr.status === 200) {
                // access the data (object with message) sent back to us by the server
                let data = this.xhr.response;
                let JSobj = JSON.parse(data);
                let err = null;
                callback(err, JSobj);
            } else {
                let JSobj = null;
                let err = `Error in DELETE request (status: ${this.xhr.status}) to ${url}`;
                callback(err, JSobj);
            }
        };
        this.xhr.onerror = (err) => {
            console.log("An Error occurred during DELETE request, with status: " + err.currentTarget.status)
        }
        this.xhr.send();
    };


}

export { AjaxLib } ;  // browser export syntax

