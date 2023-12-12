import { ComponentType, FC, MouseEventHandler } from "react";
import { Link } from "react-router-dom";
import styled, { useTheme } from "styled-components";
import Element from "./Element";

export interface ItemProps extends React.HTMLAttributes<HTMLElement> {
  icon?: ComponentType<any>;
  to?: string;
  primary?: boolean;
  onClick?: MouseEventHandler<HTMLElement>;
}

const StyledItem = styled(Element)`
  display: inline-flex;
  align-items: center;
  padding: 0.5em 1.25em;
  font-weight: bold;
  font-size: 1rem;
  text-align: left;

  .icon {
    margin-right: 1rem;
  }
`;

const Children = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
`;

const Item: FC<ItemProps> = ({
  children,
  icon,
  to,
  primary,
  onClick,
  ...props
}) => {
  const Icon = icon as any;
  const theme = useTheme();

  if (to)
    return (
      <StyledItem
        as={Link}
        primary={primary}
        to={to}
        hoverable={true}
        style={{ cursor: "pointer" }}
        {...props}
      >
        {icon && (
          <Icon
            size={32}
            color={
              primary ? theme.colors.backgroundLight : theme.colors.primary
            }
            className="icon"
          />
        )}
        <Children>{children}</Children>
      </StyledItem>
    );

  if (onClick)
    return (
      <StyledItem
        as="button"
        primary={primary}
        onClick={onClick}
        hoverable={true}
        {...props}
      >
        {icon && (
          <Icon
            size={32}
            color={
              primary ? theme.colors.backgroundLight : theme.colors.primary
            }
            className="icon"
          />
        )}
        <Children>{children}</Children>
      </StyledItem>
    );

  return (
    <StyledItem primary={primary} {...props}>
      {icon && (
        <Icon
          size={32}
          color={primary ? theme.colors.backgroundLight : theme.colors.primary}
          className="icon"
        />
      )}
      <Children>{children}</Children>
    </StyledItem>
  );
};

export default Item;
