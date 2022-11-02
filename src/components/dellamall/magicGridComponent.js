import MagicGrid from 'magic-grid-react'
import { StoreCard } from '@/components/dellamall';

const MagicGridComponent = ({item}) => {
  return (
    <>
      <MagicGrid
        items={item.length}
        gutter={30}
        maxColumn={4}
      >
        {item.map((item) => (
          <StoreCard
            key={item.id}
            item={item}
          />
        ))}
      </MagicGrid>
    </>
  );
}

export default MagicGridComponent;