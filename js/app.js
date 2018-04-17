let my_news = [
    {
        author: 'Саша Печкин',
        text: 'В четчерг, четвертого числа...',
        bigText: 'В четчерг, четвертого числа в четыре с четвертью часа четыре чёрненьких чумазеньких чертёнка чертили чёрными чернилами чертёж.'
    },
    {
        author: 'Просто Вася',
        text: 'Считаю, что $ должен стоить 35 рублей!',
        bigText: 'Считаю, что $ должен стоить 35 рублей!.А евро 42!'
    },
    {
        author: 'Гость',
        text: 'Бесплатно. Скачать. Лучший сайт - http://localhost:3000',
        bigText: 'Бесплатно. Скачать. Лучший сайт - http://localhost:3000. На самом деле платно, просто нужно прочитать очень длинное лицензионное соглашение'
    }
];

let Article = React.createClass({
    getInitialState: function() {
        return {
            visible: false
        };
    },
    readmoreClick: function(e) {
        e.preventDefault();
        this.setState({visible: true});
    },
    hideClick: function(e) {
        e.preventDefault();
        this.setState({visible: false});
    },

    render: function() {
        let author = this.props.data.author,
            text = this.props.data.text,
            bigText = this.props.data.bigText,
            visible = this.state.visible;

        return (
            <div className='article'>
                <p className='news__author'>{author}:</p>
                <p className={'news__text ' + (visible ? 'none': '')}>{text}</p>

                <a href="#"
                   onClick={this.readmoreClick}
                   className={'news__readmore ' + (visible ? 'none': '')}>Подробнее</a>
                <p className={'news__big-text ' + (visible ? '': 'none')}>{bigText}</p>
                <a href="#"
                   onClick={this.hideClick}
                   className={'news__readmore ' + (visible ? '': 'none')}>Скріть</a>
            </div>
        )
    }
});

let News = React.createClass({
    render: function() {
        let data = this.props.data;
        let newsTemplate;

        if(data.length > 0) {
            newsTemplate = data.map(function(item, index) {
                return (
                    <div key={index}>
                        <Article data={item} />
                    </div>
                )
            })
        } else {
            newsTemplate = <p>К сожалению новостей нет</p>
        }



        return (
            <div className="news">
                {newsTemplate}
                <strong className={'news__count ' + (data.length > 0 ? '':'none')}>Всего новостей: {data.length}</strong>
            </div>
        );
    }
});

let TestInput = React.createClass({
    onBtnClickHandler: function() {
        alert(ReactDOM.findDOMNode(this.refs.myTestInput).value);
    },
    render: function() {
        return (
            <div>
                <input
                    className='test-input'
                    defaultValue=''
                    placeholder='введите значение'
                    ref='myTestInput'
                />
                <button onClick={this.onBtnClickHandler} ref='alert_button'>Показать alert</button>
            </div>
        );
    }
});




let App = React.createClass({
    render: function() {
        return (
            <div className="app">
                <h1>новости</h1>
                <TestInput />
                <News data={my_news}/>
            </div>
        );
    }
});

ReactDOM.render(
    <App />,
    document.getElementById('root')
);