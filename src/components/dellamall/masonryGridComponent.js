import { StoreCard } from '@/components/dellamall';
import { MasonryGrid } from '@egjs/react-grid';

const MasonryGridComponent = ({item}) => {
  return (
    <>
      <MasonryGrid
        gap={30}
        defaultDirection={"end"}
        align={"justify"}
        useResizeObserver={true}
        observeChildren={true}
      >
        {item?.map((item) => (
          <StoreCard
            key={item.id}
            item={item}
          />
        ))}
      </MasonryGrid>
    </>
  );
}

export default MasonryGridComponent;