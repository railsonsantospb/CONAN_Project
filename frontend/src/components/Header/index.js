import { MdHome, MdCloudUpload, MdSupervisorAccount } from 'react-icons/md';

import { HeaderContainer, NavBar, Brand, MenuList, MenuItem, } from './styles';

export default function Header() {
  return (
    <HeaderContainer>
      <NavBar>
        <Brand>Stream</Brand>
        <MenuList>
          <MenuItem>
            <MdHome size={22} color="white" />
          </MenuItem>
          <MenuItem>
            <MdCloudUpload size={22} color="white" />
          </MenuItem>
          <MenuItem>
            <MdSupervisorAccount size={22} color="white" />
          </MenuItem>
        </MenuList>
      </NavBar>
    </HeaderContainer>
  );
}
