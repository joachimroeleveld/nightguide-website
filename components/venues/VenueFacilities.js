import { getSymbolForCurrency, formatAmount } from '../../lib/currencies';
import { _o } from '../../lib/i18n';
import colors from '../../styles/colors';
import __ from '../../lib/i18n';
import { pascalCase } from '../../lib/util';
import dimensions from '../../styles/dimensions';

const VENUE_FACILITIES = {
  FACILITY_VIP: 'vip_area',
  FACILITY_SMOKING_AREA: 'smoking_area',
  FACILITY_BOUNCERS: 'bouncers',
  FACILITY_KITCHEN: 'kitchen',
  FACILITY_COAT_CHECK: 'coat_check',
  FACILITY_PARKING: 'parking',
  FACILITY_CIGARETTES: 'cigarettes',
  FACILITY_ACCESSIBLE: 'accessible',
  FACILITY_TERRACE: 'terrace',
  FACILITY_TERRACE_HEATERS: 'terrace_heaters',
};
function VenueTile({ title, subtitle, iconId, dialogTitle, dialogContent }) {
  return (
    <li className={'tile'}>
      <figure>
        <img src={`/static/img/venue-tiles/${iconId}.png`} />
      </figure>
      <div className="text">
        <strong className="title">{title}</strong>
        <span className="subtitle">{subtitle}</span>
      </div>
      {/*language=CSS*/}
      <style jsx>{`
        .tile {
          background-color: ${colors.cardBg};
          border-radius: 10px;
          width: 7em;
          height: 7em;
          padding: 0.5em;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
        }
        figure {
          flex-grow: 1;
        }
        img {
          width: 2em;
          height: 2em;
          object-fit: contain;
        }
        .text {
          font-size: 0.9em;
          line-height: 1.2;
        }
        .title {
          display: block;
          margin-bottom: 0.2em;
        }
      `}</style>
    </li>
  );
}

function VenueFacilities({
  facilities = [],
  dresscode,
  fees = {},
  entranceFeeRange,
  paymentMethods = [],
  capacityRange,
  doorPolicy = {},
  currency,
}) {
  const tiles = [];

  const terraceHeaters = facilities.includes(
    VENUE_FACILITIES.FACILITY_TERRACE_HEATERS
  );
  if (
    facilities.includes(VENUE_FACILITIES.FACILITY_TERRACE) ||
    terraceHeaters
  ) {
    tiles.push({
      title: __('venuePage.tiles.terrace'),
      subtitle: terraceHeaters
        ? __('venuePage.tiles.terraceHeated')
        : __('yes'),
      iconId: 'terrace',
    });
  }

  if (entranceFeeRange) {
    let subtitle = getSymbolForCurrency(currency);
    if (entranceFeeRange.length !== 1) {
      subtitle += entranceFeeRange.join('-');
    } else {
      subtitle += `${entranceFeeRange}+`;
    }
    tiles.push({
      title: __('venuePage.tiles.entranceFee'),
      iconId: 'entrance_fee',
      subtitle,
    });
  }

  if (doorPolicy.policy) {
    const subtitle = doorPolicy.policy
      ? __(`venuePage.tiles.doorPolicy${pascalCase(doorPolicy.policy)}`)
      : __('venuePage.tiles.doorPolicyNonStrict');
    const tile = {
      title: __('venuePage.tiles.doorPolicy'),
      iconId: 'doorpolicy',
      subtitle,
    };
    if (doorPolicy.description) {
      Object.assign(tile, {
        dialogTitle: __('venuePage.tiles.doorPolicy'),
        dialogContent: (
          <div className="doorpolicy-description">
            {_o(doorPolicy.description)}
          </div>
        ),
      });
    }
    tiles.push(tile);
  }

  if (dresscode) {
    tiles.push({
      title: __('venuePage.tiles.dresscode'),
      iconId: 'dresscode',
      subtitle: __(`venuePage.tiles.dresscode${pascalCase(dresscode)}`),
    });
  }

  if (facilities.includes(VENUE_FACILITIES.FACILITY_KITCHEN)) {
    tiles.push({
      title: __('venuePage.tiles.kitchen'),
      subtitle: __('yes'),
      iconId: 'kitchen',
    });
  }

  if (facilities.includes(VENUE_FACILITIES.FACILITY_COAT_CHECK)) {
    let subtitle = __('yes');
    if (fees.coatCheck) {
      subtitle = __('venuePage.tiles.coatCheckFee', {
        fee: formatAmount(fees.coatCheck, currency, 2, true),
      });
    }
    tiles.push({
      title: __('venuePage.tiles.coatCheck'),
      iconId: 'coat_check',
      subtitle,
    });
  }

  if (capacityRange) {
    let subtitle = capacityRange.join('-');
    if (capacityRange.length === 1) {
      subtitle = '10.000+';
    }
    tiles.push({
      title: __('venuePage.tiles.capacity'),
      iconId: 'capacity',
      subtitle: subtitle,
    });
  }

  if (facilities.includes(VENUE_FACILITIES.FACILITY_BOUNCERS)) {
    tiles.push({
      title: __('venuePage.tiles.bouncers'),
      subtitle: __('yes'),
      iconId: 'bouncers',
    });
  }

  if (paymentMethods.length) {
    const subtitle = paymentMethods
      .map(method => __(`venuePage.tiles.paymentMethod${pascalCase(method)}`))
      .join(', ');
    tiles.push({
      title: __('venuePage.tiles.payment'),
      iconId: 'payment',
      subtitle,
    });
  }

  if (facilities.includes(VENUE_FACILITIES.FACILITY_PARKING)) {
    tiles.push({
      title: __('venuePage.tiles.parking'),
      subtitle: __('yes'),
      iconId: 'parking',
    });
  }

  const hasSmokingArea = facilities.includes(
    VENUE_FACILITIES.FACILITY_SMOKING_AREA
  );
  const sellsPacks = facilities.includes(VENUE_FACILITIES.FACILITY_CIGARETTES);
  if (hasSmokingArea || sellsPacks) {
    let subtitle;
    if (hasSmokingArea && sellsPacks) {
      subtitle = __('venuePage.tiles.smokingYesAndForSale');
    } else if (hasSmokingArea) {
      subtitle = __('yes');
    } else if (sellsPacks) {
      subtitle = __('venuePage.tiles.smokingPacksForSale');
    }
    tiles.push({
      title: __('venuePage.tiles.smoking'),
      iconId: 'cigarettes',
      subtitle,
    });
  }

  if (facilities.includes(VENUE_FACILITIES.FACILITY_VIP)) {
    tiles.push({
      title: __('venuePage.tiles.vipArea'),
      subtitle: __('yes'),
      iconId: 'vip',
    });
  }

  if (facilities.includes(VENUE_FACILITIES.FACILITY_ACCESSIBLE)) {
    tiles.push({
      title: __('venuePage.tiles.accessibleBuilding'),
      subtitle: __('yes'),
      iconId: 'accessible',
    });
  }

  if (!tiles.length) {
    return null;
  }

  return (
    <ul className={'tiles'}>
      {tiles.map(props => (
        <div key={props.iconId} className="tile">
          <VenueTile {...props} />
        </div>
      ))}
      {/*language=CSS*/}
      <style jsx>{`
        .tiles {
          list-style: none;
          padding: 0;
          display: flex;
          flex-wrap: wrap;
          margin: calc(${dimensions.gridGap.L} / -2);
        }
        .tile {
          margin: calc(${dimensions.gridGap.L} / 2)
            calc(${dimensions.gridGap.L} / 2);
        }
        .tile:last-child {
          margin-right: 0;
        }
      `}</style>
    </ul>
  );
}

export default VenueFacilities;
