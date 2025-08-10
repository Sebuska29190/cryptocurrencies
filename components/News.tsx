import React, { useState } from 'react';
import { Select, Typography, Row, Col, Avatar, Card } from 'antd';
import moment from 'moment';
import Loader from './Loader';

import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import { useGetCryptosQuery } from '../services/cryptoApi';

const { Text, Title } = Typography;
const { Option } = Select;

const demoImage = 'http://coinrevolution.com/wp-content/uploads/2020/06/cryptonews.jpg';

// Definiujemy strukturę danych dla TypeScript
interface NewsArticle {
  url: string;
  title: string;
  description: string;
  image?: string;
  source?: string;
  date?: string;
  thumbnail?: string;
}

interface NewsProps {
  simplified?: boolean;
}

const News: React.FC<NewsProps> = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState('Cryptocurrency');
  const { data: cryptoNewsData, isFetching } = useGetCryptoNewsQuery(undefined);
  const { data: cryptosList } = useGetCryptosQuery(100);

  if (isFetching) {
    return <Loader />;
  }

  // Dane z tego API to bezpośrednio tablica
  if (!cryptoNewsData || cryptoNewsData.length === 0) {
    return <p>Nie znaleziono wiadomości.</p>;
  }
  
  const newsToShow = simplified ? cryptoNewsData.slice(0, 6) : cryptoNewsData.slice(0, 18);

  return (
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={24}>
          <Select
            showSearch
            className="select-news"
            placeholder="Wybierz kryptowalutę"
            optionFilterProp="children"
            onChange={(value) => setNewsCategory(value)}
            filterOption={(input, option: any) => 
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            value="Cryptocurrency" // To jest teraz wartość wyświetlana, ponieważ API nie filtruje
          >
            <Option value="Cryptocurrency">Wszystkie</Option>
            {cryptosList?.data?.coins.map((coin: { name: string }) => (
              <Option key={coin.name} value={coin.name}>{coin.name}</Option>
            ))}
          </Select>
        </Col>
      )}

      {newsToShow.map((news: NewsArticle, index: number) => (
        <Col xs={24} sm={12} lg={8} key={index}>
          <Card hoverable className="news-card">
            <a href={news.url} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Title className="news-title" level={4}>{news.title}</Title>
                <img
                  style={{ maxWidth: '200px', maxHeight: '100px' }}
                  src={news.thumbnail || demoImage}
                  alt={news.title}
                />
              </div>
              <p>
                {news.description && news.description.length > 100
                  ? `${news.description.substring(0, 100)}...`
                  : news.description}
              </p>
              <div className="provider-container">
                <div style={{display: "flex", alignItems: "center"}}>
                  <Avatar src={`https://icons.duckduckgo.com/ip3/${new URL(news.url).hostname}.ico`} alt={news.source} />
                  <Text className="provider-name">{news.source}</Text>
                </div>
                {news.date && (
                  <Text>{moment(news.date).fromNow()}</Text>
                )}
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default News;
