/**
 * Get data form server
 *
 * @param {string} url the resource that you wish to fetch
 * @returns promise
 */
 const get = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);
  return response.json();
};

/**
 * Post new data to server
 *
 * @param {string} url the resource that you wish to fetch
 * @param {object} data the data you want to push to server
 * @returns promise
 */
 const post = async <T>(url: string, data: T): Promise<T> => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // the original media type of the resource
    },
    body: JSON.stringify(data), // convert newTask object to JSON string
  });
  return res.json(); // parse the JSON to object
};

/**
 * Send a changed data to server using method PATCH to updating the data
 *
 * @param {string} url
 * @param {object} data
 * @returns promise
 */
 const update = async <T>(url: string, data: T): Promise<T> => {
  const res = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

/**
 * Delete data
*/
const remove = async (url: string) => {
  const res = await fetch(url, {
    method: "DELETE",
  });
  return res.json();
};


export { get, post, update, remove }