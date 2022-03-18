import {useEffect, useState} from "react";
import {getGashaponRewardByPageTask} from "../../modules/gashapon/tasks";
import styled from "styled-components";

const LOADING_IMAGE = 'https://media0.giphy.com/media/2tOsjtp4xFgD6pc48U/giphy.gif?cid=ecf05e47u87whmeq35yzrd5gbk11147kx7jk3jwdp1yd77o2&rid=giphy.gif&ct=g'
const Home = () => {
    const getGashaponRewardByPage = getGashaponRewardByPageTask.useTask()
    const [gashaponValue, setGashaponValue] = useState(undefined)

    const handleGetAvailable = () => {
        getGashaponRewardByPage.onRequest({ gashaponId: gashaponValue })
    }

    const getRarity = (attributes) => {
        return attributes.find((attr) => attr?.trait_type === 'Rarity')?.value
    }

    const renderCard = (typeId) => {
        const length = getGashaponRewardByPage.data?.[typeId]?.length
        const card = getGashaponRewardByPage.data?.[typeId]?.[0]

        return (
            <CardWrapper>
                <CardImage src={card.image} />
                <div>
                    <TextWrapper>
                        Name: <span>{card.name}</span>
                    </TextWrapper>
                    <TextWrapper>
                        Remaining: <span>{length}</span>
                    </TextWrapper>
                    <TextWrapper>
                        Rarity: <span>{getRarity(card.attributes)}</span>
                    </TextWrapper>
                </div>

            </CardWrapper>
        )
    }
    return (
        <Wrapper>
            <input
                onChange={(e) => setGashaponValue(e.target.value)}
            />
            <button disabled={!gashaponValue || getGashaponRewardByPage.loading} onClick={handleGetAvailable}>
                Get
            </button>

            {
                getGashaponRewardByPage?.loading ? (
                    <LoadingImage src={LOADING_IMAGE} />
                ) : (
                    <>
                        <br />
                        {
                            getGashaponRewardByPage?.data && Object.keys(getGashaponRewardByPage.data).map((typeId) => (
                                <>
                                    {renderCard(typeId)}
                                </>
                            ))
                        }
                    </>
                )
            }
        </Wrapper>
    )
}

export default Home

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`
const LoadingImage = styled.img`
  width: 300px;
  
`
const CardImage = styled.img`
  width: 150px;
  height: 150px;
  object-fit: contain;
`
const CardWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
`
const TextWrapper = styled.div`
  span {
    font-size: 18px;
    font-weight: bold;
  }
`
