import { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import { getDetailContentFromAPI } from '../../Modules/utils'
import ModalCloseButton from '../Atoms/Modal/ModalCloseButton'
import DraggableSliderForPeople from '../Molecules/DraggableSliderForPeople'
import ModalPosterImage from '../Atoms/Modal/ModalPosterImage'
import ModalScrollDownButton from '../Atoms/Modal/ModalScrollDownButton'
import ModalTitle from '../Atoms/Modal/ModalTitle'
import { findCountry } from '../../Modules/utils'
import ModalTagline from '../Atoms/Modal/ModalTagline'
import ModalStory from '../Atoms/Modal/ModalStory'
import ModalScore from '../Atoms/Modal/ModalScore'
import ModalMyScore from '../Atoms/Modal/ModalMyScore'
import ModalDetailInfo from '../Molecules/ModalDetailInfo'
import ModalDetailInfoWithLink from '../Molecules/ModalDetailInfoWithLink'
import ContentSlideSectionTitle from '../Atoms/ContentSlideSectionTitle'
import UserStore from '../../Modules/UserStore'

const ModalDetailContentBackground = styled.div`
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100vw;
    height: 100vh;
    z-index: 2000;
    animation: fadeInForModal ease 0.3s forwards;

    @keyframes fadeInForModal {
        from {
            background-color: transparent;
            backdrop-filter: blur(0);
        }
        to {
            background-color: #00000040;
            backdrop-filter: blur(3rem);
        }
    }
`

const ModalDetailContentDiv = styled.div`
    position: relative;
    width: 1400rem;
    height: 800rem;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: var(--w-background);
    border-radius: 10rem;
    overflow-y: scroll;
    overflow-x: hidden;

    &::-webkit-scrollbar {
        display: none;
    }
`

const ModalDetailContentScrollArea = styled.div`
    position: relative;
    width: 100%;
`

const ModalCloseButtonWrapper = styled.div`
    position: absolute;
    top: 3%;
    left: 50%;
    transform: translateX(-50%);
    width: 1400rem;
    height: 40rem;
`

const ModalScrollDownButtonWrapper = styled.div`
    position: absolute;
    left: 50%;
    top: -60rem;
    transform: translateX(-50%);
    bottom: 60rem;
    width: 40rem;
    height: 40rem;
`

const ModalDetailContentWrapper1 = styled.div`
    position: relative;
    width: 100%;
    height: 800rem;
    background-color: white;
`

const ModalDetailContentWrapper2 = styled.div`
    position: relative;
    height: 800rem;
    width: 1000rem;
    left: 50%;
    transform: translateX(-50%);
`

const ModalDetailContentWrapper3 = styled.div`
    position: relative;
    top: 40rem;
    width: 100%;
`

const ModalDetailContentTextWrapper1 = styled.div`
    position: relative;
    width: 720rem;
`

const ModalDetailContentTextWrapper2 = styled.div`
    position: relative;
    width: 100%;
    height: ${(props) => `${props.$height}rem`};
`

const HR = styled.div`
    width: 100%;
    height: 1rem;
    background-color: var(--w-graywhite);
`

const ModalDetailInfoGrid = styled.div`
    height: 60rem;
    display: flex;
    grid-template-rows: 1fr;
    grid-auto-flow: column;
    width: 720rem;
`

const ModalBigImageImg = styled.img`
    position: sticky;
    top: 0;
    width: 1400rem;
    height: 800rem;
    object-fit: cover;
    opacity: 0;
    transition: all 0.3s;
`

function ModalDetailContent({ id, hideModal, type }) {
    const { detailData } = getDetailContentFromAPI(id, type)
    const [creditData, setCreditData] = useState([])
    const scrollHere1 = useRef(null)
    const scrollHere2 = useRef(null)
    const modalWrapper2 = useRef(null)
    const bigImage = useRef(null)
    const [myRate, setMyRate] = useState([])

    async function getCredit() {
        fetch(`https://api.themoviedb.org/3/${type}/${id}/credits?api_key=6199da9940f55ef72ddc1512ea6eca9a&language=ko`)
            .then((response) => response.json())
            .then((data) => {
                let newArray = data.cast.reduce(function (acc, current) {
                    if (acc.findIndex(({ id }) => id === current.id) === -1) {
                        acc.push(current)
                    }
                    return acc
                }, [])
                return newArray
            })
            .then((newArray) => {
                setCreditData(newArray)
            })
    }

    useEffect(() => {
        setMyRate(UserStore.findStarById(id, type))
        getCredit()
    }, [])

    async function scrollDownModal() {
        scrollHere2.current.scrollIntoView({ behavior: 'smooth' })
    }

    function calcScore() {
        let rate1 = detailData.vote_average || ''
        let rate2 = Math.floor(rate1 * 10)
        return rate2
    }

    return (
        <ModalDetailContentBackground
            onClick={() => {
                hideModal()
            }}>
            <ModalCloseButtonWrapper className='fr fright'>
                <ModalCloseButton hideModal={hideModal}></ModalCloseButton>
            </ModalCloseButtonWrapper>
            <ModalDetailContentDiv
                ref={modalWrapper2}
                onClick={(event) => {
                    event.stopPropagation()
                }}>
                <ModalDetailContentScrollArea className='fc fleft'>
                    <div style={{ width: '0', height: '0' }} ref={scrollHere1} />
                    {detailData != undefined && detailData.backdrop_path != null && (
                        <ModalBigImageImg
                            ref={bigImage}
                            src={`https://www.themoviedb.org/t/p/original/${detailData.backdrop_path}`}
                            onLoad={() => (bigImage.current.style.opacity = 1)}
                        />
                    )}
                    <ModalDetailContentWrapper1 className='fc fleft'>
                        {detailData != undefined && detailData.backdrop_path != null && (
                            <ModalScrollDownButtonWrapper>
                                <ModalScrollDownButton scrollDownModal={scrollDownModal} />
                            </ModalScrollDownButtonWrapper>
                        )}
                        {detailData != undefined && type != undefined && (
                            <ModalDetailContentWrapper2 ref={scrollHere2}>
                                <ModalDetailContentWrapper3 className='fr fsbetween'>
                                    <ModalPosterImage url={detailData.poster_path} />
                                    <ModalDetailContentTextWrapper1 className='fc fleft'>
                                        <ModalDetailContentTextWrapper2 $height='40' className='fr fsbetween'>
                                            <ModalTitle title={type == 'movie' ? detailData.title : detailData.name} />
                                            <ModalScore score={calcScore()} />
                                        </ModalDetailContentTextWrapper2>
                                        <ModalDetailContentTextWrapper2 $height='40' className='fr fsbetween' style={{ marginBottom: '10rem' }}>
                                            <ModalTagline tagline={detailData.tagline} />
                                            <ModalMyScore id={id} type={type} myRate={myRate} />
                                        </ModalDetailContentTextWrapper2>
                                        <ModalStory story={detailData.overview} />
                                        <HR />
                                        <ModalDetailInfoGrid>
                                            {type == 'movie'
                                                ? detailData.release_date != '' && (
                                                      <ModalDetailInfo text1={'개봉일'} text2={detailData.release_date} />
                                                  )
                                                : detailData.first_air_date != '' && (
                                                      <ModalDetailInfo text1={'방영일'} text2={detailData.first_air_date} />
                                                  )}
                                            {type == 'movie' ? (
                                                detailData.production_countries.length != 0 ? (
                                                    <ModalDetailInfo
                                                        text1={'제작국가'}
                                                        text2={findCountry(detailData.production_countries[0].iso_3166_1)}
                                                    />
                                                ) : null
                                            ) : detailData.origin_country.length != 0 ? (
                                                <ModalDetailInfo text1={'제작국가'} text2={findCountry(detailData.origin_country[0])} />
                                            ) : null}
                                            <ModalDetailInfoWithLink text1={'장르'} type={type} genres={detailData.genres} hideModal={hideModal} />
                                        </ModalDetailInfoGrid>
                                        <HR />
                                    </ModalDetailContentTextWrapper1>
                                </ModalDetailContentWrapper3>
                                <ModalDetailContentWrapper3 className='fc fleft'>
                                    <ContentSlideSectionTitle text={'📝 출연 & 제작진'} margin={0} />
                                    {creditData != undefined ? <DraggableSliderForPeople creditData={creditData} hideModal={hideModal} /> : null}
                                </ModalDetailContentWrapper3>
                            </ModalDetailContentWrapper2>
                        )}
                    </ModalDetailContentWrapper1>
                </ModalDetailContentScrollArea>
            </ModalDetailContentDiv>
        </ModalDetailContentBackground>
    )
}

export default ModalDetailContent
