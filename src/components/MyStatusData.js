import axios from "axios";

export function CreateMyStatus(variables) {
  // console.log("create status item");
  const query = `
  mutation createStatus($input: mentalStatusInput!) {
    createStatus(mentalStatus:$input ) {
     id
     status
    }
    }
  `;
  const OperationName = "createStatus";

  return axios
    .post("https://localhost:44352/graphql", {
      query,
      variables,
      OperationName,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
}
