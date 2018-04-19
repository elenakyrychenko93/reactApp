

let my_news = [
    {
        author: 'Саша Печкин',
        text: 'В четчерг, четвертого числа...',
        bigText: 'в четыре с четвертью часа четыре чёрненьких чумазеньких чертёнка чертили чёрными чернилами чертёж.'
    },
    {
        author: 'Просто Вася',
        text: 'Считаю, что $ должен стоить 35 рублей!',
        bigText: 'А евро 42!'
    },
    {
        author: 'Гость',
        text: 'Бесплатно. Скачать. Лучший сайт - http://localhost:3000',
        bigText: 'Насамом деле платно, просто нужно прочитать очень длинное лицензионное соглашение'
    }
];

let articles =[];

window.ee = new EventEmitter();

let Article = React.createClass({
    propTypes: {
        data: React.PropTypes.shape({
            author: React.PropTypes.string.isRequired,
            text: React.PropTypes.string.isRequired,
            bigText: React.PropTypes.string.isRequired
        })
    },
    getInitialState: function() {
        return {
            visible: false
        };
    },
    readmoreClick: function(e) {
        e.preventDefault();
        this.setState({visible: true});
    },
    hideClick: function(e) {e.preventDefault();
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

let Articles = React.createClass({
    getInitialState: function() {
        return {
            articles: []
        };
    },
    componentWillMount: function() {
        $.ajax({
            url: 'https://react-96d2f.firebaseio.com/articles.json',
            type: 'GET',
            dataType: "json",
            success: (data) => {
                this.setState({articles: data});
            }
        });
    },
    componentDidMount: function () {

    },
    render: function() {
        return(
            <div>
                {this.state.articles.map((item, index) => <Article key={index} data={item}/>)}
            </div>
        )
    }
});


let News = React.createClass({
    propTypes: {
        data: React.PropTypes.array.isRequired
    },
    getInitialState: function() {
        return {
            counter: 0
        }
    },
    render: function() {
        let data = this.props.data;
        let newsTemplate;

        // if (data.length > 0) {
        //     newsTemplate = data.map(function(item, index) {
        //         return (
        //             <div key={index}>
        //                 <Article data={item} />
        //             </div>
        //         )
        //     })
        // } else {
        //     newsTemplate = <p>К сожалению новостей нет</p>
        // }

        return (
            <div className='news'>
                <Articles/>
                {/*{newsTemplate}*/}
                {/*<strong*/}
                {/*className={'news__count ' + (data.length > 0 ? '':'none') }>Всего новостей: {data.length}</strong>*/}
            </div>
        );
    }
});
console.log(articles);
let Add = React.createClass({
    getInitialState: function() {
        return {
            agreeNotChecked: true,
            authorIsEmpty: true,
            textIsEmpty: true,
            bigTextIsEmpty: true
        };
    },

    componentDidMount: function() {
        ReactDOM.findDOMNode(this.refs.author).focus();
    },
    onBtnClickHandler: function(e) {
        e.preventDefault();
        let textEl = ReactDOM.findDOMNode(this.refs.text);

        let author = ReactDOM.findDOMNode(this.refs.author).value;
        let text = textEl.value;
        let bigText = ReactDOM.findDOMNode(this.refs.bigText).value;

        let item = [{
            author: author,
            text: text,
            bigText: bigText
        }];


        window.ee.emit('News.add', item);




        // textEl.value = '';
        // this.setState({textIsEmpty: true});
    },

    onCheckRuleClick: function(e) {
        this.setState({agreeNotChecked: !this.state.agreeNotChecked});
    },
    onFieldChange: function(fieldName, e) {
        if (e.target.value.trim().length > 0) {
            this.setState({[''+fieldName]:false})
        } else {
            this.setState({[''+fieldName]:true})
        }
    },
    render: function() {
        let agreeNotChecked = this.state.agreeNotChecked,
            authorIsEmpty = this.state.authorIsEmpty,
            textIsEmpty = this.state.textIsEmpty,
            bigTextIsEmpty = this.state.bigTextIsEmpty;
        // formIsOpened = this.state.formIsOpened;
        return (
            <form className='add cf'>
                <input
                    type='text'
                    className='add__author'
                    onChange={this.onFieldChange.bind(this, 'authorIsEmpty')}
                    placeholder='Ваше имя'
                    ref='author'
                />
                <textarea
                    className='add__text'
                    onChange={this.onFieldChange.bind(this, 'textIsEmpty')}
                    placeholder='Превью текст'
                    ref='text'
                ></textarea>
                <textarea
                    className='add__bigText'
                    onChange={this.onFieldChange.bind(this, 'bigTextIsEmpty')}
                    placeholder='Текст новости'
                    ref='bigText'
                ></textarea>
                <label className='add__checkrule'>
                    <input type='checkbox' ref='checkrule' onChange={this.onCheckRuleClick}/>Я согласен с правилами
                </label>

                <button
                    className='add__btn'
                    onClick={this.onBtnClickHandler}
                    ref='alert_button'
                    disabled={agreeNotChecked || authorIsEmpty || textIsEmpty || bigTextIsEmpty}
                >
                    Опубликовать новость
                </button>
            </form>
        );
    }
});



let OpenAddForm = React.createClass({
    getInitialState: function() {
        return {
            formIsOpened: false
        };
    },
    // openForm: function(e) {
    //     e.preventDefault();
    //     this.setState({formIsOpened: true})
    //
    // },
    // closeForm: function(e) {
    //     e.preventDefault();
    //     this.setState({formIsOpened: false})
    // },
    toggleForm: function(e) {
        e.preventDefault();
        if(this.state.formIsOpened) {
            this.setState({formIsOpened: false})
        } else
            this.setState({formIsOpened: true})
    },
    render : function() {
        let formIsOpened = this.state.formIsOpened,
            buttonText,
            form,
            button;


        if(this.state.formIsOpened) {
            form =  <Add />
            buttonText = "Close Form"
        } else {
            form = null
            buttonText = "Open Form"
        }

        return (
            <div>
                <button onClick={this.toggleForm}
                        className='open__form '
                >{buttonText}</button>
                {form}
            </div>



        )

    }
});



let App = React.createClass({
    getInitialState: function() {
        return {
            news: articles
        };
    },
    componentDidMount: function() {
        let self = this;
        window.ee.addListener('News.add', function(item) {
            let nextNews = item.concat(self.state.news);
            self.setState({news: nextNews});
        });
    },
    componentWillUnmount: function() {
        window.ee.removeListener('News.add');
    },
    render: function() {
        return (
            <div className='app'>
                <OpenAddForm />

                <h3>Новости</h3>
                <News data={this.state.news} />
            </div>
        );
    }
});

ReactDOM.render(
    <App />,
    document.getElementById('root')
);