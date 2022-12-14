import styled from 'styled-components'
import ContentGrid from '../Organisms/ContentGrid'
import ContentSlideSectionTitle from '../Atoms/ContentSlideSectionTitle'
import ScrollTopButton from '../Atoms/ScrollTopButton'
import ModalDetailContent from '../Organisms/ModalDetailContent'
import DraggableSlider from '../Molecules/DraggableSlider'
import SortList from '../Molecules/SortList'
import { useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

const TVPageTemplateWrapper = styled.div`
    width: 100vw;
`

let itemArray = [
    ['๐บ ์ธ๊ธฐ TV ํ๋ก๊ทธ๋จ', 0],
    ['# ํ์ฌ๋ฐฉ์์', 1],
    ['# ์ต๊ณ ํ์ ์', 2],
    ['โ๏ธ ์ก์ & ์ด๋๋ฒค์ฒ', 10759],
    ['๐ ๋คํ๋ฉํฐ๋ฆฌ', 99],
    ['๐คฃ ์ฝ๋ฏธ๋', 35],
    ['๐ฐ ๋ฒ์ฃ', 80],
    ['๐ช ๊ฐ์กฑ', 10751],
    ['๐ฝ SF & ํํ์ง', 10765],
    ['๐ช ์ ์ & ์ ์น', 10768],
    ['๐ฝ๏ธ ๋๋ผ๋ง', 18],
    ['๐ต๏ธ ๋ฏธ์คํฐ๋ฆฌ', 9648],
    ['๐ถ ์ด๋ฆฐ์ด', 10762],
    ['๐ฐ ๋ด์ค', 10763],
    ['๐  ๋ฆฌ์ผ๋ฆฌํฐ', 10764],
    ['๐ผ ์ฐ์๊ทน', 10766],
    ['๐ค ํ ํฌ์ผ', 10767],
    ['โ๏ธ ์ ๋๋ฉ์ด์', 16],
    ['๐ ์๋ถ', 37],
]

function getGenreByNum(num) {
    return itemArray.filter((element) => element[1] == num)
}

function TVPageTemplate({ data, changeGenre, sortType, changeSort, loginStatus }) {
    const [modal, setModal] = useState(false)
    const [noScroll, setScroll] = useState(false)
    const [id, setId] = useState(null)
    const [genreText, setGenreText] = useState('๐บ ์ธ๊ธฐ TV ํ๋ก๊ทธ๋จ')
    const [genreType, setGenreType] = useState(0)
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        if (location.pathname.replaceAll('/tv', '') == '') {
            setGenreText('๐บ ์ธ๊ธฐ TV ํ๋ก๊ทธ๋จ')
            setGenreType(0)
            changeGenre(0)
        } else {
            let genreId = location.pathname.replaceAll('/tv/genre-', '')
            setGenreText(getGenreByNum(genreId)[0][0])
            setGenreType(genreId)
            changeGenre(genreId)
        }
    }, [location.pathname])

    const showModal = async (id) => {
        setModal(true)
        setScroll(true)
        setId(id)
        document.body.style.overflow = 'none'
    }

    const hideModal = (async) => {
        setModal(false)
        setScroll(false)
    }

    async function changeGenreType(num) {
        navigate(`/tv/genre-${num}`)
    }

    useEffect(() => {
        document.querySelector('html').style.overflowY = noScroll ? 'hidden' : 'auto'
    })

    return (
        <>
            <TVPageTemplateWrapper className='fc fleft'>
                <div style={{ width: '1280rem' }} className='hcenter'>
                    <ContentSlideSectionTitle text={genreText} margin={0} />
                    <div className='fr fsbetween' style={{ marginTop: '-10rem', marginBottom: '8rem' }}>
                        <DraggableSlider itemArray={itemArray} changeGenreType={changeGenreType} />
                        {genreType > 3 ? <SortList sortType={sortType} changeSortType={changeSort} /> : null}
                    </div>
                    <ContentGrid data={data} type={'tv'} showModal={showModal} noScroll={noScroll} loginStatus={loginStatus} />
                </div>
            </TVPageTemplateWrapper>
            <ScrollTopButton />
            {modal ? <ModalDetailContent id={id} hideModal={hideModal} type={'tv'} /> : null}
        </>
    )
}

export default TVPageTemplate
