async function login() {
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;

  console.log(username, password);

  try {
    const response = await fetch("http://localhost:8080/login", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json; charset=utf8",
        Accept: "application/json",
      }),
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    // Verifica se a resposta contém o cabeçalho de autorização
    if (response.ok) {
      let key = "Authorization";
      let token = response.headers.get(key);

      if (token) {
        window.localStorage.setItem(key, token);
        showToast("#okToast");
      } else {
        console.error("Token not found in response headers");
        showToast("#errorToast");
      }

      window.setTimeout(function () {
        window.location = "/Repository/todosimple/CRUD/index.html";
      }, 2000);
    } else {
      let errorMessage = "Login failed. Please check your credentials.";

      try {
        // Tenta extrair uma mensagem de erro do corpo da resposta
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch (jsonError) {
        console.error("Failed to parse error response as JSON:", jsonError);
      }

      console.error("Erro ao fazer login:", errorMessage);
      showToast("#errorToast");
    }
  } catch (error) {
    console.error("Erro de rede ou outro erro:", error);
    showToast("#errorToast");
  }
}

function showToast(id) {
  var toastElList = [].slice.call(document.querySelectorAll(id));
  var toastList = toastElList.map(function (toastEl) {
    return new bootstrap.Toast(toastEl);
  });
  toastList.forEach((toast) => toast.show());
}
