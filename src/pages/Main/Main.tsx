import {
  CaretDownFilled,
  DoubleRightOutlined,
  GithubFilled,
  InfoCircleFilled,
  LogoutOutlined,
  PlusCircleFilled,
  QuestionCircleFilled,
  SearchOutlined,
} from '@ant-design/icons';
import type { ProSettings } from '@ant-design/pro-components';
import {
  PageContainer,
  ProCard,
  ProConfigProvider,
  ProLayout,
  SettingDrawer,
} from '@ant-design/pro-components';
import { css } from '@emotion/css';
import {
  Button,
  ConfigProvider,
  Divider,
  Dropdown,
  Form,
  Input,
  Modal,
  Popover,
  theme,
} from 'antd';
import React, { FC, useEffect, useLayoutEffect, useRef, useState } from 'react';
import defaultProps from './_defaultProps';
import { Outlet, history, useLocation } from 'umi';
import { inject, observer } from 'mobx-react';
import UserInfo from '@/mobx/reducer/UserInfo';
import { baseURL } from '@/utils/request';
import { reg } from '@/utils/validate';
import { values } from '@umijs/utils/compiled/lodash';
import { useIsomorphicLayoutEffect, useLocalStorageState, useRequest } from 'ahooks';
import { changeuserinfoApi, resetpassApi, uplodafileApi } from '@/api/pro';
import { useLocalData } from '@/hooks';
import { failMessage, successMessage } from '@/utils/message';
import routes from './routes';
const Item: React.FC<{ children: React.ReactNode }> = (props) => {
  const { token } = theme.useToken();
  return (
    <div
      className={css`
        color: ${token.colorTextSecondary};
        font-size: 14px;
        cursor: pointer;
        line-height: 22px;
        margin-bottom: 8px;
        &:hover {
          color: ${token.colorPrimary};
        }
      `}
      style={{
        width: '33.33%',
      }}
    >
      {props.children}
      <DoubleRightOutlined
        style={{
          marginInlineStart: 4,
        }}
      />
    </div>
  );
};

const List: React.FC<{ title: string; style?: React.CSSProperties }> = (
  props,
) => {
  const { token } = theme.useToken();

  return (
    <div
      style={{
        width: '100%',
        ...props.style,
      }}
    >
      <div
        style={{
          fontSize: 16,
          color: token.colorTextHeading,
          lineHeight: '24px',
          fontWeight: 500,
          marginBlockEnd: 16,
        }}
      >
        {props.title}
      </div>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
        }}
      >
        {new Array(6).fill(1).map((_, index) => {
          return <Item key={index}>具体的解决方案-{index}</Item>;
        })}
      </div>
    </div>
  );
};

const MenuCard = () => {
  const { token } = theme.useToken();
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Divider
        style={{
          height: '1.5em',
        }}
        type="vertical"
      />
    </div>
  );
};

const SearchInput = () => {
  const { token } = theme.useToken();
  return (
    <div
      key="SearchOutlined"
      aria-hidden
      style={{
        display: 'flex',
        alignItems: 'center',
        marginInlineEnd: 24,
      }}
      onMouseDown={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
    >
      <Input
        style={{
          borderRadius: 4,
          marginInlineEnd: 12,
          backgroundColor: token.colorBgTextHover,
        }}
        prefix={
          <SearchOutlined
            style={{
              color: token.colorTextLightSolid,
            }}
          />
        }
        placeholder="搜索方案"
        bordered={false}
      />
      <PlusCircleFilled
        style={{
          color: token.colorPrimary,
          fontSize: 24,
        }}
      />
    </div>
  );
};

const Main: FC = ({ UserInfo }) => {
  const [settings, setSetting] = useState<Partial<ProSettings> | undefined>({
    fixSiderbar: true,
    layout: 'mix',
    splitMenus: false,
  });
  // 设置默认选择菜单

  const [pathname, setPathname] = useState('/home');
  const [num, setNum] = useState(40);
  const location=useLocation()
  useEffect(() => {
    console.log("bianle");
    setPathname(location.pathname)
  }, [location.pathname])
  if (typeof document === 'undefined') {
    return <div />;
  }
  // 进入页面首先通过token获取getuserinfo 存储在mobx
  const { info, updataInfo, updataInfoSync, roles, updataRoles } = UserInfo
  const defaultAvatar = 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg'

  // 点击修改密码 显示模态框
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [form] = Form.useForm()
  const { setToken } = useLocalData()
  const [password, setPassword] = useLocalStorageState("password")
  const avatarInp = useRef()
  const resetpass: any = useRequest(resetpassApi, {
    manual: true,
    onSuccess: (res, paramas) => {
      if (res.code == 200) {
        // 修改密码的请求,清除存的密码,token重新登录
        setToken(""),
          setPassword("")
        updataInfoSync("")
        history.replace("/login")
        form.resetFields()
      }
    }
  })
  const handleOk = () => {
    setIsModalOpen(false);
    resetpass.run(form.getFieldsValue())

  }
  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields()
  }
  // 上传头像
  const upload = useRequest(uplodafileApi, {
    manual: true,
    onSuccess: (res, paramas) => {
      // 成功后 更新本地info数据 再调接口更新后台数据
      if (res.code == 200) {
        updataInfoSync({ ...info, avatar: res.path })
        changeUserInfo.run({ avatar: res.path })
      }
    }
  })
  const uploadFile = () => {
    const file = avatarInp.current.files[0]
    const data = new FormData()
    data.append("file", file)
    upload.run(data)
  }
  // 修改个人信息
  const changeUserInfo = useRequest(changeuserinfoApi, {
    manual: true,
    onSuccess: (res, paramas) => {
      if (res.code == 200) {
        successMessage("修改成功")
      }
    }
  })
  const [role, setRole] = useState<any>()
  const userRole = () => {
    setRole(roles?.find(item => {
      return item.value == info?.role
    }))
  }

  // 用户根据用户信息中info的role 去和 roles 中的角色 value 判断获取到  role  异步问题  info和roles 谁先获取到 


  // 当info改变了  role更新  当roles role 也更新
  useEffect(() => {
    getRoleRouteList(routes)
    userRole()
  }, [info])
  useEffect(() => {
    userRole()
  }, [roles])
  useEffect(() => {
    updataRoles()
    updataInfo()

  }, [])
  // 根据routes 中的role 和info的role进行判断,大于才能跳转,这里做路由的拦截

  const checkRoute = (routes: any, pathname: any) => {
    // 判断进入的页面的role
    routes.forEach(item => {
      if (item.routes) {
        checkRoute(item.routes, pathname)
      }
      else {
        if (item.path == pathname) {
          if (item.role > info?.role) {
            failMessage("没有访问权限")
            info && history.replace("/main/home")
            return false
          }
        }
      }
    })
  }
  const [routeList, setRouteList] = useState<any>([])
  const getRoleRouteList = (routes: any) => {
    const list: any = []
    routes.forEach(item => {
      if (info?.role >= item.role) {
        if (item.routes) {
          list.push({ ...item, routes: item.routes.filter(res => { return info?.role >= res.role }) })
        }
        else {
          list.push(item)
        }
      }
    })
    setRouteList([...list])
  }


  useLayoutEffect(() => {
    console.log(location.pathname);
    checkRoute(routes, location.pathname)
  }, [location.pathname, info])





  return (
    <div
      id="test-pro-layout"
      style={{
        height: '100vh',
        overflow: 'auto',
      }}
    >
      <ProConfigProvider hashed={false}>
        <ConfigProvider
          getTargetContainer={() => {
            return document.getElementById('test-pro-layout') || document.body;
          }}
        >
          <ProLayout
            prefixCls="my-prefix"
            bgLayoutImgList={[
              {
                src: 'https://img.alicdn.com/imgextra/i2/O1CN01O4etvp1DvpFLKfuWq_!!6000000000279-2-tps-609-606.png',
                left: 85,
                bottom: 100,
                height: '303px',
              },
              {
                src: 'https://img.alicdn.com/imgextra/i2/O1CN01O4etvp1DvpFLKfuWq_!!6000000000279-2-tps-609-606.png',
                bottom: -68,
                right: -45,
                height: '303px',
              },
              {
                src: 'https://img.alicdn.com/imgextra/i3/O1CN018NxReL1shX85Yz6Cx_!!6000000005798-2-tps-884-496.png',
                bottom: 0,
                left: 0,
                width: '331px',
              },
            ]}

            // {...defaultProps}
            route={
              {
                path: '/',
                routes: routeList // 动态获取routes
              }
            }
            location={{
              pathname,
            }}
            token={{
              header: {
                colorBgMenuItemSelected: 'rgba(0,0,0,0.04)',
              },
            }}
            // 控制是否展开
            // siderMenuType="group"
            menu={{
              collapsedShowGroupTitle: true,
            }}
            avatarProps={{
              src: info?.avatar ? info.avatar.replace("public", baseURL) : defaultAvatar,
              size: 'small',
              title: info?.username,
              onClick: (e) => {
                avatarInp.current.click()
              },
              render: (props, dom) => {
                return (
                  <Dropdown
                    menu={{
                      items: [
                        {
                          key: 'resetpass',
                          icon: <LogoutOutlined />,
                          label: '修改密码',
                          onClick: () => {
                            setIsModalOpen(true)
                          }
                        },
                        {
                          key: 'logout',
                          icon: <LogoutOutlined />,
                          label: '退出登录',
                          danger: true,
                          onClick: () => {
                            Modal.confirm({
                              title: "注销提示",
                              content: "是否注销登录",
                              okText: '确认注销',
                              okType: 'danger',
                              cancelText: '取消',
                              onOk: () => {
                                setToken("")
                                history.replace("/login")
                              }
                            })
                          }
                        },
                      ],
                    }}
                  >
                    <div>
                      {dom}
                      <input type="file" style={{ display: 'none' }} ref={avatarInp} onChange={uploadFile} />
                    </div>
                  </Dropdown>
                );
              },
            }}
            // 头像左侧
            actionsRender={(props) => {
              if (props.isMobile) return [];
              if (typeof window === 'undefined') return [];
              return [
                props.layout !== 'side' && document.body.clientWidth > 0 ? (
                  <SearchInput />
                ) : undefined,
                <InfoCircleFilled key="InfoCircleFilled" />,
                <QuestionCircleFilled key="QuestionCircleFilled" />,
                <GithubFilled key="GithubFilled" />,
                <Button shape="round" size="small" style={{ backgroundColor: role?.color }}>
                  {role?.label}
                </Button>
              ];
            }}
            headerTitleRender={(logo, title, _) => {
              const defaultDom = (
                <a>
                  {logo}
                  {title = "喜乐汽车"}
                </a>
              );
              if (typeof window === 'undefined') return defaultDom;
              if (document.body.clientWidth < 1400) {
                return defaultDom;
              }
              if (_.isMobile) return defaultDom;
              return (
                <>
                  {defaultDom}
                  <MenuCard />
                </>
              );
            }}
            menuFooterRender={(props) => {
              if (props?.collapsed) return undefined;
              return (
                <div
                  style={{
                    textAlign: 'center',
                    paddingBlockStart: 12,
                  }}
                >
                  <div>© 2023 Made with xile</div>
                  <div>by Ant 小米集团</div>
                </div>
              );
            }}
            onMenuHeaderClick={(e) => console.log(e)}
            menuItemRender={(item, dom) => (
              <div
                onClick={() => {
                  setPathname(item.path || '/main/home');
                  history.push(item.path)
                }}
                style={{ fontSize: 16 }}
              >
                {dom}
              </div>
            )}
            {...settings}
          >
            {/* 带面包屑的布局 */}
            <PageContainer
              token={{
                paddingInlinePageContainerContent: num,
              }}
              extra={[

              ]}
              style={{
                minHeight: "100vh",
                overflow: 'auto',
              }}
            >
              {/* 加载子路由 出口  */}
              <Outlet></Outlet>
            </PageContainer>
            <Modal title="重置密码" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
              <Form
                name="basic1"
                labelCol={{ span: 5, offset: 1 }}
                wrapperCol={{ span: 14 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: false }}
                autoComplete="off"
                form={form}
              >
                <Form.Item
                  label="旧密码"
                  name="oldpass"
                  dependencies={["newpass"]}
                  rules={[{ required: true, message: '请输入密码' },
                  { pattern: reg.pwd, message: "请输入至少6位数字字符密码" },
                  {
                    validator: (_, value) => {
                      if (reg.pwd.test(value)) {
                        if (value == form.getFieldValue("newpass")) {
                          return Promise.reject(new Error("新旧密码不能一致"))
                        } else {
                          return Promise.resolve()
                        }
                      }
                      else {
                        return Promise.resolve()
                      }
                    }
                  }
                  ]}
                >
                  <Input.Password />
                </Form.Item>
                <Form.Item
                  label="新密码"
                  name="newpass"
                  dependencies={["oldpass", "dbnewpass"]}
                  rules={[{ required: true, message: '请输入密码' },
                  { pattern: reg.pwd, message: "请输入至少6位数字字符密码" },
                  {
                    validator: (_, value) => {
                      if (reg.pwd.test(value)) {
                        if (value == form.getFieldValue("dbnewpass")) {
                          return Promise.resolve()
                        } else {
                          return Promise.reject(new Error("两次密码不一致"))
                        }
                      }
                      else {
                        return Promise.resolve()
                      }
                    }
                  }
                  ]}
                >
                  <Input.Password />
                </Form.Item>
                <Form.Item
                  label="确认新密码"
                  name="dbnewpass"
                  dependencies={["newpass"]}
                  rules={[{ required: true, message: '请输入密码' },
                  { pattern: reg.pwd, message: "请输入至少6位数字字符密码" },
                  {
                    validator: (_, value) => {
                      if (reg.pwd.test(value)) {
                        if (value == form.getFieldValue("newpass")) {
                          return Promise.resolve()
                        } else {
                          return Promise.reject(new Error("两次密码不一致"))
                        }
                      }
                      else {
                        return Promise.resolve()
                      }
                    }
                  }]}
                >
                  <Input.Password />
                </Form.Item>
              </Form>
            </Modal>
          </ProLayout>
        </ConfigProvider>
      </ProConfigProvider>
    </div>
  );
};



export default inject("UserInfo")(observer(Main))