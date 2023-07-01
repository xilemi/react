import { ProCard, StatisticCard } from '@ant-design/pro-components';
import { Statistic } from 'antd';
import RcResizeObserver from 'rc-resize-observer';
import { useState } from 'react';
import { EllipsisOutlined } from '@ant-design/icons';

const { Divider } = ProCard;

const imgStyle = {
  display: 'block',
  width: 42,
  height: 42,
};

const Home =() => {
  const [responsive, setResponsive] = useState(false);
  return (
    <div>
      <RcResizeObserver
        key="resize-observer"
        onResize={(offset) => {
          setResponsive(offset.width < 596);
        }}

      >
        <StatisticCard.Group direction={responsive ? 'column' : 'row'}>
          <StatisticCard
            statistic={{
              title: '服务(人次)',
              value: 601986875,
            }}
          />
          <Divider type={responsive ? 'horizontal' : 'vertical'} />
          <StatisticCard
            statistic={{
              title: '销售数量累计',
              value: 3701928,
              description: <Statistic title="占比" value="61.5%" />,
            }}
            chart={
              <img
                src="https://gw.alipayobjects.com/zos/alicdn/ShNDpDTik/huan.svg"
                alt="百分比"
                width="100%"
              />
            }
            chartPlacement="left"
          />
          <StatisticCard
            statistic={{
              title: '好评反馈',
              value: 1806062,
              description: <Statistic title="占比" value="98.5%" />,
            }}
            chart={
              <img
                src="https://gw.alipayobjects.com/zos/alicdn/6YR18tCxJ/huanlv.svg"
                alt="百分比"
                width="100%"
              />
            }
            chartPlacement="left"
          />
        </StatisticCard.Group>
      </RcResizeObserver>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 40 }}>
        <StatisticCard
          title="大盘趋势"
          tip="大盘说明"
          style={{ maxWidth: 480 }}
          extra={<EllipsisOutlined />}
          chart={
            <img
              src="https://gw.alipayobjects.com/zos/alicdn/a-LN9RTYq/zhuzhuangtu.svg"
              alt="柱状图"
              width="100%"
            />
          }
        />
        <StatisticCard
          title="大盘趋势"
          tip="大盘说明"
          style={{ maxWidth: 480 }}
          extra={<EllipsisOutlined />}
          chart={
            <img
              src="https://gw.alipayobjects.com/zos/alicdn/a-LN9RTYq/zhuzhuangtu.svg"
              alt="柱状图"
              width="100%"
            />
          }
        /> <StatisticCard
          title="大盘趋势"
          tip="大盘说明"
          style={{ maxWidth: 480 }}
          extra={<EllipsisOutlined />}
          chart={
            <img
              src="https://gw.alipayobjects.com/zos/alicdn/a-LN9RTYq/zhuzhuangtu.svg"
              alt="柱状图"
              width="100%"
            />
          }
        />
      </div>
      <div style={{marginTop:40}}>
      <RcResizeObserver
      key="resize-observer"
      onResize={(offset) => {
        setResponsive(offset.width < 596);
      }}
    >
      <StatisticCard.Group direction={responsive ? 'column' : 'row'}>
        <StatisticCard
          statistic={{
            title: '支付金额',
            value: "2176亿",
            icon: (
              <img
                style={imgStyle}
                src="https://gw.alipayobjects.com/mdn/rms_7bc6d8/afts/img/A*dr_0RKvVzVwAAAAAAAAAAABkARQnAQ"
                alt="icon"
              />
            ),
          }}
        />
        <StatisticCard
          statistic={{
            title: '访客数',
            value: "475万",
            icon: (
              <img
                style={imgStyle}
                src="https://gw.alipayobjects.com/mdn/rms_7bc6d8/afts/img/A*-jVKQJgA1UgAAAAAAAAAAABkARQnAQ"
                alt="icon"
              />
            ),
          }}
        />
        <StatisticCard
          statistic={{
            title: '成功订单数',
            value: "87万",
            icon: (
              <img
                style={imgStyle}
                src="https://gw.alipayobjects.com/mdn/rms_7bc6d8/afts/img/A*FPlYQoTNlBEAAAAAAAAAAABkARQnAQ"
                alt="icon"
              />
            ),
          }}
        />
        <StatisticCard
          statistic={{
            title: '浏览量',
            value: "1754万",
            icon: (
              <img
                style={imgStyle}
                src="https://gw.alipayobjects.com/mdn/rms_7bc6d8/afts/img/A*pUkAQpefcx8AAAAAAAAAAABkARQnAQ"
                alt="icon"
              />
            ),
          }}
        />
      </StatisticCard.Group>
    </RcResizeObserver>
      </div>
    </div>

  );
};



export default Home