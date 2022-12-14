import { useState, useRef } from 'react'
import styled from 'styled-components'
import DraggableSliderItem from '../Atoms/Slider/DraggableSliderItem'

const DraggableSliderWrapper = styled.div`
    display: grid;
    grid-template-rows: 1fr;
    grid-auto-flow: column;
    width: 1050rem;
    height: 40rem;
    overflow-x: scroll;
    column-gap: 20rem;
    &::-webkit-scrollbar {
        height: 1px;
    }
    &::-webkit-scrollbar-thumb {
        background: transparent;
    }
    &:hover::-webkit-scrollbar-thumb {
        background: var(--w-graywhite);
    }
`

function DraggableSlider({ itemArray, changeGenreType }) {
    const [isMouseDown, setMouseDown] = useState(false)
    const [isMouseMove, setMouseMove] = useState(false)
    const [startX, setStartX] = useState(0)
    const [scrollLeft, setScrollLeft] = useState(0)
    const slider = useRef(null)

    function mouseDownEvent() {
        setMouseDown(true)
        setStartX(event.pageX - slider.current.offsetLeft)
        setScrollLeft(slider.current.scrollLeft)
    }
    function mouseUpEvent() {
        setMouseDown(false)
    }

    function mouseMoveEvent() {
        event.preventDefault()
        if (isMouseDown) {
            const x = event.pageX - slider.current.offsetLeft
            const scroll = x - startX
            slider.current.scrollLeft = scrollLeft - scroll
            setMouseMove(true)
        }
    }

    function mouseLeaveEvent() {
        if (isMouseDown) {
            setMouseDown(false)
        }
    }

    async function changeGenreType2(num) {
        if (!isMouseMove) changeGenreType(num)
        else setMouseMove(false)
    }

    return (
        <DraggableSliderWrapper
            className='no-drag'
            ref={slider}
            onMouseDown={mouseDownEvent}
            onMouseUp={mouseUpEvent}
            onMouseMove={mouseMoveEvent}
            onMouseLeave={mouseLeaveEvent}>
            {itemArray.map((item) => {
                return (
                    <DraggableSliderItem
                        className='no-drag'
                        text={item[0]}
                        num={item[1]}
                        key={`genre-${item[1]}`}
                        changeGenreType={changeGenreType2}
                    />
                )
            })}
        </DraggableSliderWrapper>
    )
}

export default DraggableSlider
