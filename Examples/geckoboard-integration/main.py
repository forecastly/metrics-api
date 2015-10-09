from geckopush import Gecko

from chartmogul import ChartMogul

import datetime

import calendar

def get_month_day_range(date):
    """
    For a date 'date' returns the start and end date for the month of 'date'.

    Month with 31 days:
    >>> date = datetime.date(2011, 7, 27)
    >>> get_month_day_range(date)
    (datetime.date(2011, 7, 1), datetime.date(2011, 7, 31))

    Month with 28 days:
    >>> date = datetime.date(2011, 2, 15)
    >>> get_month_day_range(date)
    (datetime.date(2011, 2, 1), datetime.date(2011, 2, 28))
    """
    first_day = date.replace(day = 1)
    last_day = date.replace(day = calendar.monthrange(date.year, date.month)[1])
    return first_day, last_day

# ChartMogul

token = ""

secret = ""

# Geckoboard

api_key = ''

widget_key = ''

mogul = ChartMogul(token, secret)

end_date = datetime.date.today()

start_date, _ = get_month_day_range(end_date)

current_mrr = mogul.get_mrr('month', start_date, end_date)

metrics = [

{'New Business MRR' : "$ {:.2f}".format(current_mrr['mrr-new-business'])},

{'Expansion MRR' : "$ {:.2f}".format(current_mrr['mrr-expansion'])},

{'Contraction MRR' : "$ {:.2f}".format(current_mrr['mrr-contraction'])},

{'Churn MRR' : "$ {:.2f}".format(current_mrr['mrr-churn'])},

{'Reactivation MRR' : "$ {:.2f}".format(current_mrr['mrr-reactivation'])},

{'Net MRR Movement' : "$ {:.2f}".format(current_mrr['mrr-net-movement'])},

]

# push to Geckboard

g = Gecko(api_key)

g.glist(widget_key, metrics)