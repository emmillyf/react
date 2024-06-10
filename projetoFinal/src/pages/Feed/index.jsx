import { Link } from "react-router-dom";
import "./style.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar/Sidebar";

function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/publicacao")
      //.get("https://666253c262966e20ef0840ba.mockapi.io/publicacao")
      .then((response) => {
        setPosts(response.data);
      })
      .catch(() => console.log("Erro na requisição!"));
  }, []);

  function deletePost(id) {
    axios.delete(`http://localhost:8080/publicacao/${id}`);
    //axios.delete(`https://665fa6d55425580055b0594f.mockapi.io/posts/${id}`);
    setPosts(posts.filter((post) => post.id !== id));
  }

  return (
    <div>
      <Sidebar />
      <main>
        <div className="cards">
          {posts.map((post, key) => {
            return (
              <div className="card" key={key}>
                <header>
                  <h2>{post.titulo}</h2>
                </header>
                <div className="line" />
                <p>{post.usuario}</p> {/* Nome do usuário sem rótulo */}
                <p>{post.descricao}</p>
                <p>{post.nota}</p>
                <div className="btns">
                  <div className="btn-edit">
                    <Link to={`/update/${post.id}`}>
                      <button>Editar</button>
                    </Link>
                  </div>

                  <div className="btn-readmore">
                    <Link to={`/more/${post.id}`}>
                      <button>Ler mais</button>
                    </Link>
                  </div>

                  <div className="btn-delete">
                    <button onClick={() => deletePost(post.id)}>Apagar</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

export default Feed;
