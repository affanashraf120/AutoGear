// react
import React from 'react';
// third-party
import { FormattedMessage } from 'react-intl';
// myData
import features from '~/myData/componentsData/block_feature';

export type IBlockFeaturesLayout = 'top-strip' | 'bottom-strip';

interface Props {
    layout: IBlockFeaturesLayout;
}

function BlockFeatures(props: Props) {
    const { layout } = props;

    return (
        <div className={`block block-features block-features--layout--${layout}`}>
            <div className="container">
                <ul className="block-features__list">
                    {features.map(({ title, subtitle, FeatureIcon }, index) => (
                        <li key={index} className="block-features__item">
                            <div className="block-features__item-icon">
                                <FeatureIcon />
                            </div>
                            <div className="block-features__item-info">
                                <div className="block-features__item-title">
                                    <FormattedMessage id={title} />
                                </div>
                                <div className="block-features__item-subtitle">
                                    <FormattedMessage id={subtitle} />
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default React.memo(BlockFeatures);
