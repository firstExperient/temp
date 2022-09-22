const url = "https://a.altq.co.il/104/pub_data";

const server = async (body) => {
  const res = await fetch(url, {
    method: "POST",
    headers:{
      "Content-Type":"application/json"
    },
    body: JSON.stringify(body),
  });
  const json = await res.json();
  if (res.status != 200) {
    throw json
  } else {
    return json;
  }
};

export default server;
