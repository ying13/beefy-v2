import { makeStyles } from '@material-ui/core';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { formatLargePercent } from '../../../../helpers/format';
import { useAppSelector } from '../../../../store';
import { selectDashboardUserStablecoinsExposure } from '../../../data/selectors/balance';
import { styles } from './styles';

const useStyles = makeStyles(styles);

interface StablesExposureProps {
  address: string;
}

export const StablesExposure = memo<StablesExposureProps>(function StablesExposure({ address }) {
  const { t } = useTranslation();
  const stablecoinsExposureData = useAppSelector(state =>
    selectDashboardUserStablecoinsExposure(state, address)
  );
  const stablePercentage = stablecoinsExposureData.filter(item => item.key === 'stable');
  const classes = useStyles({
    stablesPercentage: formatLargePercent(stablePercentage[0]?.percentage, 0, '0%'),
  });
  return (
    <div className={classes.container}>
      <div className={classes.title}>{t('Exposure-Stables')}</div>
      <div className={classes.bar}>
        <div className={classes.stableBar} />
      </div>
      <div className={classes.legendContainer}>
        {stablecoinsExposureData.map(item => {
          return (
            <div key={item.key} className={classes.legendItem}>
              <div
                className={classes.square}
                style={{ backgroundColor: item.key === 'stable' ? '#3D5CF5' : '#C2D65C' }}
              />
              <div className={classes.label}>
                {item.key} <span>{formatLargePercent(item.percentage, 2, '0%')}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});
