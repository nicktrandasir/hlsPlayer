import styled from "styled-components";
import {useEffect, useState} from "react";
import Hls from "hls.js";
import {theme} from "./assets/theme";

export default function App() {
    const [inputData, setInputData] = useState("");
    const [videoPlay, setVideoPlay] = useState(false);

    const hls = new Hls();
    const video = document.getElementById("video");

    useEffect(() => {
        const video = document.getElementById("video");

        if (Hls.isSupported()) {
            hls.loadSource(inputData);
            hls.attachMedia(video);
            hls.on(Hls.Events, function () {
                video.play()
            })
        }
        video.addEventListener('playing', () => {
            setVideoPlay(true)
        });
        video.addEventListener('pause', () => {
            setVideoPlay(false)
        });
        document.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                video.play()
            }
        });

    }, [inputData])

    const onPlay = (event) => {
        if (inputData.length > 0) {
            event.preventDefault();
            video.play()

        }
    }

    const onStop = (event) => {
        if (inputData.length > 0) {
            event.preventDefault();
            video.pause()
        }
    }

    return (
        <MainContainer className="App">
            <InpBtnBlock>
                <Input
                    type="text"
                    placeholder={"Инпут куда нужно ввести ссылку"}
                    value={inputData}
                    onChange={(e) => setInputData(e.target.value)}/>
                <Button
                    type="Submit"
                    onClick={(event) => videoPlay ? onStop(event) : onPlay(event)}>{videoPlay ? "Остановить" : "Запустить"}
                </Button>
            </InpBtnBlock>
            <VideoBlock id="video" controls/>
        </MainContainer>
    );
}
const MainContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 100px;
  row-gap: 50px;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 50px;
    row-gap: 30px;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 16px;
    row-gap: 16px;
  }
`;

const InpBtnBlock = styled.form`
  display: flex;
  column-gap: 40px;
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    flex-direction: column;
    align-items: center;
    row-gap: 40px;
  }
`;

const Input = styled.input`
  width: 600px;
  height: 40px;
  padding: 8px 12px;
  font-size: 24px;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 450px;
    height: 32px;
    padding: 4px 8px;
    font-size: 16px;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: 100%;
    height: 24px;
    padding: 4px 8px;
    font-size: 14px;
  }
`;

const Button = styled.button`
  width: 200px;
  font-size: 24px;
  background: ${theme.colors.red};
  color: ${theme.colors.white};

  :hover {
    background: ${theme.colors.redDark};
    color: ${theme.colors.pink};
  }
`;

const VideoBlock = styled.video`
  border-radius: 30px;
  max-width: 100%;
`;
