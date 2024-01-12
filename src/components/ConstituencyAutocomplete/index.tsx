import { TextField } from "@mui/material";
import * as React from "react";
import Autocomplete, { autocompleteClasses } from "@mui/material/Autocomplete";
import useMediaQuery from "@mui/material/useMediaQuery";
import ListSubheader from "@mui/material/ListSubheader";
import Popper from "@mui/material/Popper";
import { useTheme, styled } from "@mui/material/styles";
import { VariableSizeList, ListChildComponentProps } from "react-window";
import Typography from "@mui/material/Typography";
import constituencies from "../../data/btw21_constituencies.json" assert { type: "json" };

export type constituencyOption = {
  id: number;
  constituency_country_id: number;
  constituency_id: number;
  constituency_name: string;
};

export default function ConstituencyAutocomplete({
  handleSearchValue,
}: {
  handleSearchValue: (value: string) => void;
}) {
  const constituencyOptions: constituencyOption[] = constituencies.map(
    (constituency, index) => ({
      id: index,
      constituency_country_id: Number(constituency["Land"]),
      constituency_id: Number(constituency["Wahlkreis"]),
      constituency_name: constituency["Gemeinde Name"],
    })
  );

  const filteredConstituencyOptions = constituencyOptions
    .filter((option) => option.constituency_id !== 0)
    .filter((value, index, self) => self.indexOf(value) === index);

  return (
    <Autocomplete
      disablePortal
      sx={{ width: 500 }}
      disableListWrap
      id='searchField'
      PopperComponent={StyledPopper}
      ListboxComponent={ListboxComponent}
      options={filteredConstituencyOptions}
      getOptionLabel={(option) =>
        option.constituency_id + " - " + option.constituency_name
      }
      isOptionEqualToValue={(option, value) => option.id === value.id}
      onInputChange={(event, value) => {
        console.log(event);
        handleSearchValue(value);
      }}
      renderInput={(params) => <TextField {...params} label={"Gemeinde"} />}
      renderOption={(props, option, state) =>
        [props, option, state.index] as React.ReactNode
      }
      renderGroup={(params) => params as any}
    />
  );
}

const LISTBOX_PADDING = 8; // px

function renderRow(props: ListChildComponentProps) {
  const { data, index, style } = props;
  const dataSet = data[index];
  const inlineStyle = {
    ...style,
    top: (style.top as number) + LISTBOX_PADDING,
  };

  if (dataSet.hasOwnProperty("group")) {
    return (
      <ListSubheader key={dataSet.key} component='div' style={inlineStyle}>
        {dataSet.group}
      </ListSubheader>
    );
  }

  return (
    <Typography component='li' {...dataSet[0]} noWrap style={inlineStyle}>
      {`${dataSet[1].constituency_id} - ${dataSet[1].constituency_name}`}
    </Typography>
  );
}

const OuterElementContext = React.createContext({});

// eslint-disable-next-line react/display-name
const OuterElementType = React.forwardRef<HTMLDivElement>((props, ref) => {
  const outerProps = React.useContext(OuterElementContext);
  return <div ref={ref} {...props} {...outerProps} />;
});

function useResetCache(data: any) {
  const ref = React.useRef<VariableSizeList>(null);
  React.useEffect(() => {
    if (ref.current != null) {
      ref.current.resetAfterIndex(0, true);
    }
  }, [data]);
  return ref;
}

// Adapter for react-window
const ListboxComponent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLElement>
>(function ListboxComponent(props, ref) {
  const { children, ...other } = props;
  const itemData: React.ReactElement[] = [];
  (children as React.ReactElement[]).forEach(
    (item: React.ReactElement & { children?: React.ReactElement[] }) => {
      itemData.push(item);
      itemData.push(...(item.children || []));
    }
  );

  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up("sm"), {
    noSsr: true,
  });
  const itemCount = itemData.length;
  const itemSize = smUp ? 36 : 48;

  const getChildSize = (child: React.ReactElement) => {
    if (child.hasOwnProperty("group")) {
      return 48;
    }

    return itemSize;
  };

  const getHeight = () => {
    if (itemCount > 8) {
      return 8 * itemSize;
    }
    return itemData.map(getChildSize).reduce((a, b) => a + b, 0);
  };

  const gridRef = useResetCache(itemCount);

  return (
    <div ref={ref}>
      <OuterElementContext.Provider value={other}>
        <VariableSizeList
          itemData={itemData}
          height={getHeight() + 2 * LISTBOX_PADDING}
          width='100%'
          ref={gridRef}
          outerElementType={OuterElementType}
          innerElementType='ul'
          itemSize={(index) => getChildSize(itemData[index])}
          overscanCount={5}
          itemCount={itemCount}>
          {renderRow}
        </VariableSizeList>
      </OuterElementContext.Provider>
    </div>
  );
});

const StyledPopper = styled(Popper)({
  [`& .${autocompleteClasses.listbox}`]: {
    boxSizing: "border-box",
    "& ul": {
      padding: 0,
      margin: 0,
    },
  },
});
