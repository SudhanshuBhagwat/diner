import { Html5Qrcode } from "html5-qrcode";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  function handleView() {
    const qrReader = new Html5Qrcode("reader");
    qrReader
      .start(
        {
          facingMode: "environment",
        },
        {
          fps: 10,
          aspectRatio: 1,
        },
        (decodedText) => {
          if (decodedText) {
            qrReader.stop();
            try {
              navigate(decodedText);
            } catch (err) {
              console.error(err);
            }
          }
        },
        (errorMessage) => {}
      )
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <div className="h-screen bg-gray-100 flex flex-col justify-center items-center space-y-2">
      <div
        id="reader"
        className="h-52 w-52 border-2 border-gray-600 rounded-md"
      ></div>
      <button
        onClick={handleView}
        className="bg-blue-400 px-4 py-2 rounded-md font-bold text-white"
      >
        Start Viewing
      </button>
    </div>
  );
}

export default Home;
