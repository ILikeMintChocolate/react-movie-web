import styled from 'styled-components'
import ContentGrid from '../Organisms/ContentGrid'
import ContentSlideSectionTitle from '../Atoms/ContentSlideSectionTitle'
import ScrollTopButton from '../Atoms/ScrollTopButton'
import ModalDetailContent from '../Organisms/ModalDetailContent'
import DraggableSlider from '../Molecules/DraggableSlider'
import SortList from '../Molecules/SortList'
import { useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

const MoviePageTemplateWrapper = styled.div`
    width: 100vw;
`

let itemArray = [
    ['πΏ μΈκΈ° μν', 0],
    ['# νμ¬μμμ', 1],
    ['# κ°λ΄μμ μ', 2],
    ['# μ΅κ³ νμ μ', 3],
    ['βοΈ μ‘μ', 28],
    ['π  λͺ¨ν', 12],
    ['π λ€νλ©ν°λ¦¬', 99],
    ['π€£ μ½λ―Έλ', 35],
    ['π° λ²μ£', 80],
    ['πΉ λ‘λ§¨μ€', 10749],
    ['πͺ κ°μ‘±', 10751],
    ['π° ννμ§', 14],
    ['π μ­μ¬', 36],
    ['π± κ³΅ν¬', 27],
    ['π½ SF', 878],
    ['πΊ TV μν', 10770],
    ['πͺ μ€λ¦΄λ¬', 53],
    ['πͺ μ μ', 10752],
    ['π μλΆ', 37],
    ['π½οΈ λλΌλ§', 18],
    ['βοΈ μ λλ©μ΄μ', 16],
    ['πΈ μμ', 10402],
    ['π΅οΈ λ―Έμ€ν°λ¦¬', 9648],
] // λͺ¨λ μν = 0

function getGenreByNum(num) {
    return itemArray.filter((element) => element[1] == num)
}

function MoviePageTemplate({ data, changeGenre, sortType, changeSort, loginStatus }) {
    const [modal, setModal] = useState(false)
    const [noScroll, setScroll] = useState(false)
    const [id, setId] = useState(null)
    //const [sortType, setSortType] = useState(1) // 1 = νμ μ, 2 = μΈκΈ°μ, 3 = μ΅μ μ
    const [genreText, setGenreText] = useState('πΏ μΈκΈ° μν')
    const [genreType, setGenreType] = useState(0)
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        if (location.pathname.replaceAll('/movie', '') == '') {
            setGenreText('πΏ μΈκΈ° μν')
            setGenreType(0)
            changeGenre(0)
        } else {
            let genreId = location.pathname.replaceAll('/movie/genre-', '')
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
        navigate(`/movie/genre-${num}`)
    }

    useEffect(() => {
        document.querySelector('html').style.overflowY = noScroll ? 'hidden' : 'auto'
    })

    return (
        <>
            <MoviePageTemplateWrapper className='fc fleft'>
                <div style={{ width: '1280rem' }} className='hcenter'>
                    <ContentSlideSectionTitle text={genreText} margin={0} />
                    <div className='fr fsbetween' style={{ marginTop: '-10rem', marginBottom: '8rem' }}>
                        <DraggableSlider itemArray={itemArray} changeGenreType={changeGenreType} />
                        {genreType > 3 ? <SortList sortType={sortType} changeSortType={changeSort} /> : null}
                    </div>
                    <ContentGrid data={data} type={'movie'} showModal={showModal} noScroll={noScroll} loginStatus={loginStatus} />
                </div>
            </MoviePageTemplateWrapper>
            <ScrollTopButton />
            {modal ? <ModalDetailContent id={id} hideModal={hideModal} type={'movie'} /> : null}
        </>
    )
}

export default MoviePageTemplate
