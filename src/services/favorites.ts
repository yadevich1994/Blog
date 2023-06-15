export const fetchAddLike = (slug: string, token: string) => {
  fetch(`https://blog.kata.academy/api/articles/${slug}/favorite`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    return res.json();
  });
};

export const fetchDeleteLike = (slug: string, token: string) =>
  fetch(`https://blog.kata.academy/api/articles/${slug}/favorite`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());

export default [];
