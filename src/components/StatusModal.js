// camera is not completed
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { TYPES } from "../redux/actions/statusAction";
import { FaImages, FaCamera } from "react-icons/fa";
import { createPost, updatePost } from "../redux/actions/postAction";
const StatusModal = () => {
  const [content, setContent] = useState("");
  const [stream, setStream] = useState(false);
  const [tracks, setTracks] = useState("");

  const [images, setImages] = useState([]);

  const videoRef = useRef();
  const refCanvas = useRef();

  const { auth, status } = useSelector((state) => state);

  const dispatch = useDispatch();
  console.log(status);

  const handleImageChange = (e) => {
    const files = [...e.target.files];
    console.log(files);
    let err = "";
    let newImages = [];

    files.forEach((file) => {
      if (!file) return (err = "File doesnot exists");

      if (file.type !== "image/jpeg" && file.type !== "image/png") {
        return (err = "Image format is incorrect");
      }

      return newImages.push(file);
    });
    setImages([...images, ...newImages]);
    console.log(newImages, "newImages");
  };

  const deleteImages = (index) => {
    const newArr = [...images];
    newArr.splice(index, 1);
    setImages(newArr);
  };
  const handleStream = () => {
    setStream(true);
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((mediaStream) => {
          videoRef.current.srcObject = mediaStream;
          videoRef.current.play();
          const track = mediaStream.getTracks();
          setTracks(track[0]);
        })
        .catch((err) => console.log(err));
    }
  };

  const handleStopStream = () => {
    setStream(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (images.length === 0) return alert("Please add pictuers to post..");

    if (status.onEdit) {
      dispatch(updatePost({ content, auth, images, status }));
    } else {
      dispatch(createPost({ content, auth, images }));
    }

    setContent("");
    setImages([]);
    dispatch({ type: "STATUS", payload: false });
  };

  useEffect(() => {
    // images.forEach((image) => URL.revokeObjectURL(image.preview));
    if (status.onEdit) {
      setContent(status.content);
      setImages(status.images);
    }
  }, [status]);

  return (
    <div className="status_modal fixed top-0 left-0  bg-[#0008] z-10 w-full h-screen overflow-auto">
      <form
        className="max-w-screen-md mx-auto bg-white my-32  rounded-xl p-5"
        onSubmit={handleSubmit}
      >
        <div className="status_header flex justify-between items-center  border-b-2 pb-4 mb-4">
          <h5 className="text-lg font-bold">Create Post</h5>
          <span
            className="text-md font-bold border rounded-full px-2 cursor-pointer "
            onClick={() => dispatch({ type: TYPES.STATUS, payload: false })}
          >
            &times;
          </span>
        </div>

        <div className="status_body">
          <textarea
            className="w-full min-h-[150px] outline-none resize-none"
            content="content"
            value={content}
            placeholder={`${auth.user.username} , what are you thinking?`}
            onChange={(e) => setContent(e.target.value)}
          />
          <div className="show_images max-h-[250px] w-full overflow-y-auto grid gap-2 grid-cols-3 items-center row-auto">
            {images.map((img, index) => (
              <div
                key={index}
                id="file_img "
                className="relative w-full h-full"
              >
                <img
                  src={img.url ? img.url : URL.createObjectURL(img)}
                  alt="images"
                  className="object-cover w-full h-full "
                />
                <span
                  className="text-md font-bold border rounded-full px-2 cursor-pointer absolute top-[-4px] right-[-4px] z-10 bg-white text-red-800 border-red-800 "
                  onClick={() => deleteImages(index)}
                >
                  &times;
                </span>
              </div>
            ))}
          </div>

          {stream && (
            <div>
              <video src="" autoPlay muted ref={videoRef} />
              <span onClick={handleStopStream}> &times; </span>
              <canvas />
            </div>
          )}

          <div className="input_images relative flex justify-center gap-5 mb-2">
            <FaCamera
              className="h-7 w-7 cursor-pointer"
              onClick={handleStream}
            />
            <div className="file_upload overflow-hidden flex relative">
              <FaImages className="h-7 w-7 cursor-pointer" />
              <input
                className="absolute top-0 left-0 opacity-0"
                type="file"
                name="file"
                id="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
          </div>
        </div>

        <div className="status_footer">
          <button
            className=" bg-blue-800 p-2 rounded-lg w-full text-white hover:bg-blue-950 hover:duration-150"
            type="submit"
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default StatusModal;
