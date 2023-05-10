import { StoreCard } from '@/components/dellamall'
import { MasonryGrid } from '@egjs/react-grid'

const MasonryGridComponent = ({ item, none = false }) => {
    return (
        <>
            <MasonryGrid
                gap={28}
                defaultDirection={'end'}
                align={'left'}
                useResizeObserver={true}
                observeChildren={true}>
                {item?.map((item, index) => (
                    <StoreCard key={index} item={item} none={none} />
                ))}
            </MasonryGrid>
        </>
    )
}

export default MasonryGridComponent
